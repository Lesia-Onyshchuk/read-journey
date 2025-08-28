import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/signin", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await api.post(
        "/users/signout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/signup", data);
      console.log("REGISTER RESPONSE:", res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        return rejectWithValue("No token found");
      }

      const res = await api.get("/users/current", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data; // тут бекенд має повернути { user: { name, email, ... } }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);
