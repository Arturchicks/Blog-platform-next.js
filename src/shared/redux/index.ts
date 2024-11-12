import { configureStore } from "@reduxjs/toolkit"
import { baseApi } from "./api"
import localReducer from "./local"
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    local: localReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})
