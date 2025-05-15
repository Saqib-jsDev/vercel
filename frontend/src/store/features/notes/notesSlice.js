import { createSlice } from "@reduxjs/toolkit";
import { getAllNotesThunk } from "./notesActions";

const initialState = {
    notes:[],
    loading:false,
    error :false
}


const notesSlice = createSlice({
    name:"notes",
    initialState,
    reducers:{

    },
    extraReducers:builder=>{
        builder.addCase(getAllNotesThunk.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(getAllNotesThunk.fulfilled,(state,action)=>{
            state.notes= action.payload;
            state.loading = false;
            state.error= false;
        }).addCase(getAllNotesThunk.rejected,(state,action)=>{
            state.error = action.payload;
    state.loading = false;
        })
    }

})
export default notesSlice.reducer;