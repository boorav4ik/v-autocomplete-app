import { configureStore } from "@reduxjs/toolkit";
import { commentsApi } from "./services/comments";

export const store = configureStore({
  reducer: {
    [commentsApi.reducerPath]: commentsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commentsApi.middleware)
});
