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
export default notificationSlice.reducer;