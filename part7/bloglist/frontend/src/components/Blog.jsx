import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Blog = ({ id }) => {
  const blog = useSelector((state) => state.blogs.find(el => el.id === id));


  return (
    <div>
      <Link to={`/blogs/${id}`}>{blog.title}</Link>
    </div>
  );
};

export default Blog;
