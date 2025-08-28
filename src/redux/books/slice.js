import { createSlice } from "@reduxjs/toolkit";
import { getRecommendedBooks } from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendedBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecommendedBooks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload; // тут твій масив книг
      })
      .addCase(getRecommendedBooks.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default booksSlice.reducer;
