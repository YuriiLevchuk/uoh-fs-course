import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    resetNotification() {
      return null;
    }
  },
});

export const { showNotification, resetNotification } = notificationSlice.actions;

export const setNotification = (message, timeS) => {
  return async dispatch => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(resetNotification());
    }, timeS * 1000);
  }
}

export default notificationSlice.reducer;