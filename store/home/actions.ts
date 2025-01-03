import clientFetcher from "@/lib/fetcher/clientFetcher";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getHomeData = createAsyncThunk("home/gethHomeData", async (lng: string) => {
  const response = await clientFetcher({
    url: `/extra/fidaar/jsons/${lng}.json`,
    method: "GET",
    lng,
    parameters: ``,
  });
  return response;
});
