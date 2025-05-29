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
const createNoteThunk = createAsyncThunk(
  "note/createNote",
  async (formData,thunkAPI) => {
    const state = thunkAPI.getState();
    const userInfo = state.userAuth.userInfo;
    try {
      const config = {
        headers :{
          authorization:`Bearer ${userInfo.token}`
        }
      }
      const {data} = await api.post("api/notes/create",formData,config);
      return data;

      
    } catch (error) {
                  return thunkAPI.rejectWithValue(error.message);

    }
  }
)
const updateNoteThunk = createAsyncThunk("notes/updatenote",async ({formData,id},thunkAPI) => {
   const state = thunkAPI.getState();
    const userInfo = state.userAuth.userInfo;
    try {
      const config = {
        headers:{
          authorization:`Bearer ${userInfo.token}`
        }
      }
      const {data} = await api.put(`api/notes/${id}`,formData,config);
      return data ;


    } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
    }
})



const deleteNoteThunk = createAsyncThunk(
  "notes/deletenote",
  async (id,thunkAPI) => {
    const state = thunkAPI.getState();
    const userInfo = state.userAuth.userInfo;
    try {
      const config = {
        headers:{
          authorization:`Bearer ${userInfo.token}`
        }
      }
      const {data} = await api.delete(`api/notes/${id}`,config);
      return data ;


    } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
    }
    
  }
)

export { getAllNotesThunk,createNoteThunk,updateNoteThunk,deleteNoteThunk };


