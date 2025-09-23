import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
const Menu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.setItem("loggedInBlogUser", null);
    dispatch(setUser(null));
  };

  const padding = {
    padding: 5
  };

  return(
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Blog App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/blogs">Blogs</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/users">Users</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {user !== null
                ?<div>
                  <a>Signed in as: {user.name}</a>
                  <Button variant="dark" onClick={handleLogout} style={padding} className="ms-2" size="sm">Log Out</Button>
                </div>
                :<div>
                  Please, login
                </div>
              }
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Menu;