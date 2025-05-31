import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const userLoginthunk = createAsyncThunk(
  "userAuth/login",
  async function ({ email, password }, thunkAPI) {
    try {
      const { data } = await api.post("/api/users/login", { email, password });
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
    
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
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
export const userUpdateProfileThunk = createAsyncThunk("userAuth/UpdateProfile",async function name(formData,thunkAPI) {

      const state = thunkAPI.getState();
    const userInfo = state.userAuth.userInfo;

    try {
       const config = {
        headers :{
          authorization:`Bearer ${userInfo.token}`
        }
      }

      const { data } = await api.post("/api/users/profile", formData, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);

    }
})