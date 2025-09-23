import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;

export const loginWithInfo = (info) => {
  return async (dispatch) => {
    const logedInUser = await loginService.login(info);
    dispatch(setUser(logedInUser));
  };
};

export default userSlice.reducer;