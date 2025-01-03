import * as T from "@/lib/types";

export interface HomeReducerType {
  homeData: { data: T.homeDataType | null; loading: boolean };
}
