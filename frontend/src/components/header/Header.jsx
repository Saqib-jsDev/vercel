import Container from "react-bootstrap/Container";
import { Nav, Form, FormControl, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Links, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../store/features/user/userSlice";
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const hideOnRoutes = ["/login","/signup"];

  const isHidden = hideOnRoutes.includes(location.pathname);
const handleLogout = ()=>{

dispatch(logout())
}


  const userLoggedIn = localStorage.getItem("userInfo");
  console.log(userLoggedIn);
  
  if (userLoggedIn) {
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link className="text-white" to="/">
            Note Zipper
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          <Nav>
            <>
              {console.log(userLoggedIn)}

              <Link className="text-white" to="/mynotes">
                My Notes
              </Link>

              <NavDropdown
                title={userLoggedIn?.name}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/profile">
                  {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      // width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                  My Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
              </NavDropdown>
            </>
            {!isHidden && (
       userLoggedIn ? (
        <Nav.Link
          href="/login"
          onClick={handleLogout}
        >
          Logout
        </Nav.Link>
      ) : (
        <Nav.Link href="/login" className="text-white">
          Login
        </Nav.Link>
      )
)}
       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
