"use client";
import { configureStore } from "@reduxjs/toolkit";
import storeSlice from "./slice";
import { Provider } from "react-redux";
import { baseApi } from "./api";
export const store = configureStore({
  reducer: { [baseApi.reducerPath]: baseApi.reducer, local: storeSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

const ClientStore = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default ClientStore;
