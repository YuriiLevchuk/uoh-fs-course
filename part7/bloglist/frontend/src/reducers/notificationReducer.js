import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { notification: null, isError: false },
  reducers: {
    setNotification(state, action) {
      return {
        notification: action.payload,
        isError: false
      };
    },
    setError(state, action) {
      return {
        notification: action.payload,
        isError: true
      };
    },
    resetNotification() {
      return { notification: null, isError: false };
    }
  },
});

export const { setNotification, setError, resetNotification } = notificationSlice.actions;

let timeoutId;
export const showNotification = (message, timeS) => {
  return dispatch => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    dispatch(setNotification(message));
    
    timeoutId = setTimeout(() => {
      dispatch(resetNotification());
      timeoutId = null;
    }, timeS * 1000);
  };
};
export default notificationSlice.reducer;