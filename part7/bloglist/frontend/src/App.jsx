import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,Route,Link,Navigate,useNavigate
} from "react-router-dom";

import blogService from "./services/blogs";

import UserView from "./components/UserView";
import BlogView from "./components/BlogView";
import Bloglist from "./components/Bloglist";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import UsersList from "./components/UsersList";
import Menu from "./components/Menu";

import { setUser } from "./reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      blogService.setToken(user.token);
      window.localStorage.setItem(
        "loggedInBlogUser",
        JSON.stringify(user),
      );
    }
    
  }, [user, navigate]);


  return (
    <div className="container">
      <Notification />
      <Menu />
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/blogs" replace /> : <LoginForm />}
        />

        <Route
          path="/blogs"
          element={user ? <Bloglist /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/users"
          element={user ? <UsersList /> : <Navigate to="/login" replace />}
        />
        
        <Route
          path="/users/:id"
          element={user ? <UserView /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/blogs/:id"
          element={user ? <BlogView /> : <Navigate to="/login" replace />}
        />

        <Route
          index
          element={user ? <Navigate to="/blogs" replace /> : <Navigate to="/login" replace />}
        />
        
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </div>
    
  );
};

export default App;
