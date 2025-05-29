import { createSlice } from "@reduxjs/toolkit";
import {userLoginthunk,userSignupThunk} from "./userActions";


const userFromLS = localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")):null;
const initialState = {  
  userInfo:userFromLS,
  loading: false,
  error: "",
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.userInfo = {};
      localStorage?.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoginthunk.pending, (state, action) => {
        console.log("login pending");

        state.loading = true;
      })
      .addCase(userLoginthunk.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(userLoginthunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })   .addCase(userSignupThunk.pending, (state, action) => {
        console.log("signUp  pending","action payload",action);
        state.loading = true;
      })
      .addCase(userSignupThunk.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        console.log("signUp  fulfilled","action payload",action);

        state.loading = false;
      })
      .addCase(userSignupThunk.rejected, (state, action) => {
        console.log("signUp  rejected","action payload",action);
        state.loading = false;
        state.error = action.payload || "Failed to login";
      });
  },
});
export const { logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
