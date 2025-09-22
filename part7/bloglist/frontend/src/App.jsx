import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";

import Bloglist from "./components/Bloglist";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

import { setUser } from "./reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // on mount
  useEffect(() => {
    const loggedInUser = JSON.parse(
      window.localStorage.getItem("loggedInBlogUser"),
    );
    if (loggedInUser) {
      dispatch(setUser(loggedInUser));
      blogService.setToken(loggedInUser.token);
    }
  }, [dispatch]);
  // on user change
  useEffect(() => {
    if (user) {
      console.log("effect if fired");
      blogService.setToken(user.token);
      window.localStorage.setItem(
        "loggedInBlogUser",
        JSON.stringify(user),
      );
    }
  }, [user]);


  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm/>
      ) : (
        <Bloglist/>
      )}
    </div>
  );
};

export default App;
