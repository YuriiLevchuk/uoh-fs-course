import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, editBlog } from "../reducers/blogsReducer";
import { Link } from "react-router-dom";
const Blog = ({ id }) => {
  const blog = useSelector((state) => state.blogs.find(el => el.id === id));
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,

    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={{ ...blogStyle }}>
      <Link to={`/blogs/${id}`}>{blog.title}</Link>
    </div>
  );
};

export default Blog;
