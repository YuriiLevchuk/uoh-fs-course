import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import Togglable from "./Togglable";

import { useDispatch, useSelector } from "react-redux";
import { setNotification, setError } from "../reducers/notificationReducer";
import { loginWithInfo } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginInfo = { username, password };
    try {
      await dispatch(loginWithInfo(loginInfo));
      //navigate("/");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
      dispatch(setError("Wrong Credentials"));
    }
      
  };
  // window.localStorage.setItem(
  //   "loggedInBlogUser",
  //   JSON.stringify(user),
  // );
  return (
    <>
      <h2>Login to Application</h2>

      <Togglable label="Login Form">
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">
              username
              <input
                type="text"
                value={username}
                id="username"
                name="username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              password
              <input
                type="password"
                value={password}
                id="password"
                name="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button name="login" type="submit">
            Login
          </button>
        </form>
      </Togglable>
    </>
  );
};

export default LoginForm;
