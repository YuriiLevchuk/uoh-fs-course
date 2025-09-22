import { useEffect, useState } from "react";
import usersService from "../services/users";
import { useParams } from "react-router-dom";
const UserView = () => {
  const [ viewedUser, setViewedUser ] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    usersService
      .getAll()
      .then((r) => {
        console.log(r);
        const viewedUser = r.find((u) => u.id === id);
        setViewedUser(viewedUser);
      });
  }, [id]);

  if (!viewedUser) return null;
  return (
    <div>
      <h2>{viewedUser.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {viewedUser.blogs.map((b) => {
          return <li key={b.id}>{b.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default UserView;