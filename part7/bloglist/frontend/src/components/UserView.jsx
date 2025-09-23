import { useEffect, useState } from "react";
import usersService from "../services/users";
import Blog from "./Blog";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
const UserView = () => {
  const [ viewedUser, setViewedUser ] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    usersService
      .getAll()
      .then((r) => {
        const viewedUser = r.find((u) => u.id === id);
        setViewedUser(viewedUser);
      });
  }, [id]);

  if (!viewedUser) return null;
  return (
    <div>
      <h2>{viewedUser.name}&apos;s blogs</h2>
      <Table striped>
        <tbody>
          {viewedUser.blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog, index) => (
              <tr key={blog.id}>
                <td>{index+1+")"}</td>
                <td>
                  <Blog id={blog.id}/>
                </td>
                <td>{"votes: " +blog.likes}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserView;