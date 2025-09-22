import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
const Menu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const handleLogout = () => {
    window.localStorage.setItem("loggedInBlogUser", null);
    dispatch(setUser(null));
  };

  return(
    <div>
      {user 
        ?<>
          <Link to="/blogs">Blogs</Link>
          <Link to="/users">Users</Link> &ensp;
          Logged in as {user.name} &ensp;
          <button onClick={handleLogout}>Log Out</button>
        </> 
        :<> 
          Please, login
        </>
      }
      
    </div>
  );
};

export default Menu;