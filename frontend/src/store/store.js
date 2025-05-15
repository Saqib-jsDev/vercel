import notesSlice from "./features/notes/notesSlice";
import userAuthSlice from "./features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { userAuth: userAuthSlice, notes: notesSlice },
});

export default store;
