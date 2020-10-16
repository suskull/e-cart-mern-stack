import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { userLogout } from "../actions/user";
import {withRouter} from 'react-router-dom'
const Header = ({history}) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const handleLogout = () => {
    history.push('/')
    dispatch(userLogout())
  }
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Batman</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart (
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                {!userInfo ? (
                  <Nav.Link>
                    <i className="fas fa-user"></i> Signin
                  </Nav.Link>
                ) : (
                  <NavDropdown
                    title={`${userInfo.name}  ${" "} `}
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <i className="fas fa-user"></i> Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default withRouter(Header);
