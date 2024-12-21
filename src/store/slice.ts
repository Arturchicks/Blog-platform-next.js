import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "storeSlice",
  initialState: {
    isLoggedIn: false,
    username: "",
    tag: "",
  },
  reducers: {
    setLogIn: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    setLogOut: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setTag: (state, action) => {
      state.username = action.payload;
    },
  },
});
export const { setLogIn, setLogOut, setUsername, setTag } = storeSlice.actions;
export default storeSlice.reducer;
