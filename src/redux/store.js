import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice.js";
import booksReducer from "./books/slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
  },
});
