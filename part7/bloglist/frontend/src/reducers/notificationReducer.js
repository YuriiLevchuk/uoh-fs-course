import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { notification: "aaaaaaa", isError: false },
  reducers: {
    setNotification(state, action) {
      console.log("123");
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

export const showNotification = (message, timeS) => {
  return async dispatch => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(resetNotification());
    }, timeS * 1000);
  };
};

export default notificationSlice.reducer;