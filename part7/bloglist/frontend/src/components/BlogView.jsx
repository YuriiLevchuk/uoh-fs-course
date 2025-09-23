import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBlog, editBlog, updateBlog, createComment, setBlogs } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";

import { Button } from "react-bootstrap";

const BlogView = () => {
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.find(el => el.id === id));
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const likeBlog = async () => {
    try {
      const likedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user
      };
      await dispatch(editBlog(likedBlog));
      
    } catch (err) {
      console.error("faied to like blog");
    }
  };

  const removeBlog = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      return 0;
    try {
      dispatch(deleteBlog(blog))
        .then(navigate("/"));
    } catch (err) {
      console.log("failed to remove blog");
    }
  };

  const addComment = () => {
    if (!comment) return 0;
    try {
      dispatch(createComment(blog, comment)).then(() => {
        setComment("");
      });
    } catch (err) {
      console.error("failed to add comment");
    }
  };

  if (!blog) return null;
  return <div>
    <h2>{blog.title} <a>by {blog.author}</a></h2>
    <p>
      <Button variant="light" onClick={likeBlog}>&#128077; {blog.likes}</Button> 
    </p>
    <p> 
      <a href={blog.url}>{blog.url}</a>
    </p>
    <p>
      {user.username === blog.user.username ? (
        <>
          <i>this post was added by You</i> <br />
          <br /> <Button variant="dark" onClick={removeBlog}>remove</Button>
        </>
      ) : (
        <i>this post was added by @{blog.user.username}</i>
      )}
    </p>

    <h3>Comments</h3>
    <input type="text"
      name="comment"
      id="comment"
      value={comment}
      onChange={({ target }) => setComment(target.value)}
    />
    <Button variant="dark" onClick={addComment}>add comment</Button>
    {blog.comments 
      ? <ul>
        {blog.comments.map((comment, i) => 
          <li key={i}>{comment}</li>)}
      </ul>
      : <p>No comments yet...</p>}
  </div>;
};

export default BlogView;