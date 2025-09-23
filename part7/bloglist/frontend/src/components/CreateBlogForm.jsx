import { useState } from "react";
import blogServices from "../services/blogs";

import { useDispatch } from "react-redux";
import { createNewBlog } from "../reducers/blogsReducer";
import { showNotification } from "../reducers/notificationReducer";
const CreateBlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newBlog = { title, author, url };
      dispatch(createNewBlog(newBlog));

      setTitle("");
      setAuthor("");
      setUrl("");
      dispatch(showNotification(`Created new blog "${newBlog.title}"`, 5));

    } catch (err) {
      dispatch(showNotification("Failed to create new blog", 5));
    }
  };

  return (
    <>
      <h2>Create new Blog</h2>

      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="title">title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          <label htmlFor="author">author: </label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          <label htmlFor="url">url: </label>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button name="createBlog" type="submit">
          Create
        </button>
      </form>
    </>
  );
};

export default CreateBlogForm;
