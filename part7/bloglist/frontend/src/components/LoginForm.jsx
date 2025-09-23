import { useState, useEffect } from "react";
import Togglable from "./Togglable";

import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { loginWithInfo } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginInfo = { username, password };
    try {
      await dispatch(loginWithInfo(loginInfo));
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
      dispatch(showNotification("Wrong Credentials", 5, true));
    }
      
  };
  return (
    <>
      <h2>Login to Application</h2>

      <Togglable label="Login Form">
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label htmlFor="username">
              username
            </Form.Label>
            <Form.Control
              type="text"
              value={username}
              id="username"
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">
              password
            </Form.Label>
            <Form.Control
              type="password"
              value={password}
              id="password"
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
            
          </Form.Group>
          <Button variant="primary" name="login" type="submit">
            Login
          </Button>
        </Form>
      </Togglable>
    </>
  );
};

export default LoginForm;
