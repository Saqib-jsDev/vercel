import Container from "react-bootstrap/Container";
import { Nav, Form, FormControl, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Links, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/user/userSlice";
export default function Header({setSearch}) {
  const location = useLocation();
  const navigate = useNavigate();

  const hideOnRoutes = ["/login", "/signup"];

  const isHidden = hideOnRoutes.includes(location.pathname);
  const handleLogout = () => {
    dispatch(logout());
  };

  const userInfo = localStorage.getItem("userInfo");
console.log(userInfo);

  if (userInfo) {
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
            <div>

              <Link className="text-white mx-2" to="/mynotes">
                My Notes
              </Link>
              <Link href="/profile" className="text-white mx-2">
                  {<img
                      alt=""
                      src={`${userInfo?.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> }
                  My Profile
                </Link>
{!isHidden &&
              (userInfo ? (
                <Link href="/" onClick={handleLogout}className="text-white">
                  Logout
                </Link>
              ) : (
                <Link href="/login" className="text-white">
                  Login
                </Link>
              ))}
            </div>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
