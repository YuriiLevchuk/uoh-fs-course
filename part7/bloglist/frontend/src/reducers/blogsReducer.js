import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
    updateBlog(state, action) {
      const blogToChange = action.payload;
      //const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 };
      const changedBlogs = state.map(el => el.id !== blogToChange.id ? el : blogToChange);
      console.log(changedBlogs);
      return changedBlogs;

    },
  },
});

export const { setBlogs, appendBlog, removeBlog, updateBlog } = blogsSlice.actions;

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const createNewBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const deleteBlog = (blog) => { 
  return async (dispatch) => {
    await blogService.remove(blog);
    dispatch(removeBlog(blog));
  };
};

export const editBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog);
    dispatch(updateBlog(blog));
  };
};

export default blogsSlice.reducer;