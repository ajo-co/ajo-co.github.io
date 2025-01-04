import { authenticationStatus, errorMaker, successStatus } from "../helper";
import { fetcherArgs, method } from "../types";

export default function clientFetcher<Response = unknown, M extends method = "GET", B = undefined>(
  args: fetcherArgs<M, B>
): Promise<Response | any> {
  return new Promise<Response>((resolve, reject) => {
    const { url, body, headers, method, parameters = undefined, ignoreBody = false, lng } = args;
    const head = new Headers();
    head.set("Accept", "application/json");
    if (!ignoreBody) {
      head.set("Content-Type", "application/json");
    }

    if (headers) {
      for (const i in headers) {
        head.set(i, headers[i]);
      }
    }
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://safetest.ir";
    const concatedURl = `${BASE_URL}${url}`;

    (method === "GET"
      ? fetch(concatedURl, {
          headers: head,
        })
      : fetch(concatedURl, {
          body: ignoreBody ? (body as BodyInit) : (JSON.stringify(body) as BodyInit),
          method,
          headers: head,
        })
    )
      .then(async (result) => {
        const response = await result.json();
        // console.log(response);
        // console.log(response.statusCode);

        if (!successStatus(result.status)) {
          return reject(
            // new Error(
            errorMaker(result.status, response.message?.clientMessage, response.systemCode)
            // )
          );
        } else {
          return resolve(response);
        }
      })
      .catch((error) => {
        const parseError = typeof error === "string" ? JSON.parse(error) : undefined;
        reject(
          // new Error(
          errorMaker(parseError?.status, parseError?.message?.clientMessage, parseError?.systemCode)
          // )
        );
      });
  });
}
