import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newBlog) => {
  const headers = { headers: { Authorization: token } };

  const res = await axios.post(baseUrl, newBlog, headers);
  return res.data;
};

const update = async (blog) => {
  const headers = { headers: { Authorization: token } };
  const changedBlog = { ...blog, user: blog.user.id };
  const res = await axios.put(`${baseUrl}/${blog.id}`, changedBlog, headers);
  return res.data;
};

const remove = async (blog) => {
  const headers = { headers: { Authorization: token } };

  const res = await axios.delete(`${baseUrl}/${blog.id}`, headers);
  return res;
};

const addComment = async (blogId, comment) => {
  const headers = { headers: { Authorization: token } };
  const res = await axios.post(`${baseUrl}/${blogId}/comments`, { comment }, headers);
  return res.data;
};

export default {
  setToken,
  getAll,
  create,
  update,
  remove,
  addComment
};
