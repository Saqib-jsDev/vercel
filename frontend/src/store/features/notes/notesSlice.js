import { createSlice } from "@reduxjs/toolkit";
import {
  getAllNotesThunk,
  createNoteThunk,
  updateNoteThunk,
  deleteNoteThunk,
} from "./notesActions";

const initialState = {
  notes: [],
  loading: false,
  error: false,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotesThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllNotesThunk.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getAllNotesThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteNoteThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        const deletedNote = action.payload;
        console.log(deletedNote,"from slice fullfilled deleted note");
        
        state.error = false;
        state.loading = false;
        state.notes = state.notes.filter(
          (note) => note._id !== deletedNote._id
        );
      })
      .addCase(deleteNoteThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createNoteThunk.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createNoteThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.notes.push(action.payload);
      })
      .addCase(createNoteThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateNoteThunk.pending,(state,action)=>{
        state.loading = true;
      })
      .addCase(updateNoteThunk.fulfilled,(state,action)=>{
        state.loading = false;
        
        const allNotesWithUpdatedNote = state.notes?.map(note =>{
          if(note._id === action.payload._id){
            const updatednote = action.payload;
            return updatednote;
          }else{
            return note;
          }
        })
        state.notes = allNotesWithUpdatedNote;
      })
      .addCase(updateNoteThunk.rejected,(state,action)=>{
        state.error = action.payload;
        state.loading = false;

      })
      ;
  },
});
export default notesSlice.reducer;
