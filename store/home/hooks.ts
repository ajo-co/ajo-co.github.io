import { useSelector } from "react-redux";
import { AppState } from "@/store/types";

export function useReduxHomeData() {
  return useSelector<AppState, AppState["homeData"]>((select) => select.homeData);
}
