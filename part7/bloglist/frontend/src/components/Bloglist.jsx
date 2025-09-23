import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

import CreateBlogForm from "./CreateBlogForm";
import Blog from "./Blog";
import Togglable from "./Togglable";

import { useDispatch, useSelector } from "react-redux";
import { initialiseBlogs } from "../reducers/blogsReducer";

import { Table } from "react-bootstrap";

const Bloglist = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  // get blogs //
  useEffect(() => {
    dispatch(initialiseBlogs());
  }, [dispatch]);
  

  return (
    <>
      <h2>Blogs</h2>
      <br />
      <Togglable label="New Blog">
        <CreateBlogForm/>
      </Togglable>
      <br />
      <Table striped>
        <tbody>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog, index) => (
              <tr key={blog.id}>
                <td>{index+1+")"}</td>
                <td>
                  <Blog id={blog.id}/>
                </td>
                <td>{"votes: " +blog.likes}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      
    </>
  );
};

blogService.PropTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Bloglist;
