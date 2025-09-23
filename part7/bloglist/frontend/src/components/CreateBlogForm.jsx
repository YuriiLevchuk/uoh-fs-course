import { useState } from "react";
import blogServices from "../services/blogs";

import { useDispatch } from "react-redux";
import { createNewBlog } from "../reducers/blogsReducer";
import { showNotification } from "../reducers/notificationReducer";

import { Form, Button } from "react-bootstrap";
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
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label htmlFor="title">title: </Form.Label>
          <Form.Control
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="author">author: </Form.Label>
          <Form.Control
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="url">url: </Form.Label>
          <Form.Control
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>

        <Button variant="dark" name="createBlog" type="submit">
          Create
        </Button >
      </Form>
    </>
  );
};

export default CreateBlogForm;
