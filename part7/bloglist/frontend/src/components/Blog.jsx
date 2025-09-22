import { useState } from "react";
import blogServices from "../services/blogs";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteBlog, editBlog } from "../reducers/blogsReducer";
import { useSelector } from "react-redux";

const Blog = ({ id }) => {
  const blog = useSelector((state) => state.blogs.find(el => el.id === id));
  const user = useSelector((state) => state.user);
  const [isFullView, setIsFullView] = useState(false);
  
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,

    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  //button handlers//
  const toggleFullView = () => setIsFullView((x) => !x);

  const likeBlog = async () => {
    try {
      const likedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user
      };
      console.log(blog.user);
      await dispatch(editBlog(likedBlog));
      
    } catch (err) {
      console.error("faied to like blog");
    }
  };

  const removeBlog = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      return 0;
    try {
      dispatch(deleteBlog(blog));
    } catch (err) {
      console.log("failed to remove blog");
    }
  };

  //page element//
  const detailedView = () => {
    if (!isFullView)
      return (
        <div className="blogContainer">
          &quot;{blog.title}&quot; by {blog.author} &ensp;
          <button onClick={toggleFullView}>View</button>
        </div>
      );
    else
      return (
        <div className="blogContainer">
          <h3>
            &quot;{blog.title}&quot; by {blog.author} &ensp;
            <button onClick={toggleFullView}>Hide</button>
          </h3>

          <p>
            <a href={blog.url}>{blog.url}</a> <br />
            <a>likes {blog.likes}</a> &ensp;
            <button onClick={likeBlog}>like</button> <br />
            {blog.author} <br />
          </p>
          <p>
            {user.username === blog.user.username ? (
              <>
                <i>this post was added by You</i> <br />
                <br /> <button onClick={removeBlog}>remove</button>
              </>
            ) : (
              <i>this post was added by @{blog.user.username}</i>
            )}
          </p>
        </div>
      );
  };

  return (
    <>
      <div style={{ ...blogStyle }}>{detailedView()}</div>
    </>
  );
};

export default Blog;
