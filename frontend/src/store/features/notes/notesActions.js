import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const getAllNotesThunk = createAsyncThunk(
  "notes/getallnotes",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    
    const userInfo = state.userAuth?.userInfo;



    try {
      const config = {
        headers: {
        
            authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await api.get("/api/notes", config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { getAllNotesThunk };


