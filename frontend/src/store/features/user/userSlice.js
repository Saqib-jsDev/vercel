import { createSlice } from "@reduxjs/toolkit";
import { userLoginthunk, userSignupThunk, userUpdateProfileThunk } from "./userActions";

const userFromLS = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userInfo: userFromLS,
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

        state.loading = true;
      })
      .addCase(userLoginthunk.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(userLoginthunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
      .addCase(userSignupThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userSignupThunk.fulfilled, (state, action) => {
        state.userInfo = action.payload;

        state.loading = false;
      })
      .addCase(userSignupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
      .addCase(userUpdateProfileThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userUpdateProfileThunk.fulfilled, (state, action) => {
        state.userInfo = action.payload;

        state.loading = false;
      })
      .addCase(userUpdateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      });
  },
});
export const { logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
