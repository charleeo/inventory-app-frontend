import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authStore";
import httpSlice from "./httpStore";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    http:httpSlice.reducer
  },
});
export default store;
