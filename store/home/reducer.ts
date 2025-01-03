import { createReducer, createSlice } from "@reduxjs/toolkit";
import { getHomeData } from "./actions";
import { HomeReducerType } from "./type";

const initHomeData: HomeReducerType = {
  homeData: {
    data: null,
    loading: false,
  },
};
export const homeDataReducer = createReducer(initHomeData, (builder) => {
  builder.addCase(getHomeData.pending, (state, action) => {
    state.homeData = { data: state.homeData.data, loading: true };
  });
  builder.addCase(getHomeData.fulfilled, (state, action) => {
    state.homeData = { data: action.payload, loading: false };
  });
  builder.addCase(getHomeData.rejected, (state, action) => {
    state.homeData = {
      data: null,
      loading: false,
    };
  });
});
