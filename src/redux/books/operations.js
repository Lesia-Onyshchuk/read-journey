import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getRecommendedBooks = createAsyncThunk(
  "books/recommended",
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await api.get(`/books/recommend?page=${page}`);
      return res.data; // очікуємо { results: [...], totalPages: N }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch books"
      );
    }
  }
);
