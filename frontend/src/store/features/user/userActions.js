import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const userLoginthunk = createAsyncThunk(
  "userAuth/login",
  async function ({ email, password }, thunkAPI) {
    try {
      const { data } = await api.post("/api/users/login", { email, password });
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSignupThunk = createAsyncThunk(
  "userAuth/signup",
  async function name(formData, thunkAPI) {
    console.log(formData,"farmData from thunk action ");
    
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // File upload ke liye
        },
      };

      const { data } = await api.post("/api/users/signup", formData, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);

    }
  }
);
