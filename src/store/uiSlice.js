import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { loading: null},
  reducers: {
    showLoadingScreen(state,action) {
      state.loading= {
         loading: action.payload.loading
       }
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
