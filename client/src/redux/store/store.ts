import { configureStore } from "@reduxjs/toolkit";
import { itemsApi } from "../api/itemsApi";

// main redux store
export const store = configureStore({
  reducer: {
    // api reducer for items requests
    [itemsApi.reducerPath]: itemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsApi.middleware),
});
