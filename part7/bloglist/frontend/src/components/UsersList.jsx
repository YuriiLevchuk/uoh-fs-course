import { useEffect, useState } from "react";
import usersService from "../services/users";
import { Link } from "react-router-dom";
const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService
      .getAll()
      .then((res) => setUsers(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr><th></th><th>Blogs created</th></tr>
        </thead>
        <tbody>
          {users.map((u) => {
            return <tr key={u.id}>
              <td><Link to={`/users/${u.id}`}>{u.name}</Link>&ensp;</td>
              <td>{u.blogs.length}</td>
            </tr>;
          })}
        </tbody>
      </table>
      
    </div>
  );
};

export default UsersList;