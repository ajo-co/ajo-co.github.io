import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/types";
import { homeDataReducer } from "@/store/home/reducer";

const rootReducer = combineReducers({
  homeData: homeDataReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
