import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

import CreateBlogForm from "./CreateBlogForm";
import Blog from "./Blog";
import Togglable from "./Togglable";

import { useDispatch, useSelector } from "react-redux";
import { initialiseBlogs } from "../reducers/blogsReducer";
import { setUser } from "../reducers/userReducer";
const Bloglist = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // get blogs //
  useEffect(() => {
    dispatch(initialiseBlogs());
  }, [dispatch]);
  

  return (
    <>
      <h2>Blogs</h2>
      <br />
      <Togglable label="New Note">
        <CreateBlogForm/>
      </Togglable>
      <br />
      {[...blogs]
        .sort((a, b) => b.likes - a.likes) // sort array by likes (descending)
        .map((blog) => (
          <Blog key={blog.id} id={blog.id}/>
        ))}
    </>
  );
};

blogService.PropTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Bloglist;
