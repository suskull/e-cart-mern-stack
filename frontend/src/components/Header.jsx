import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { Container, Navbar, Nav } from "react-bootstrap";
import {userLogout} from '../actions/user'
const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

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
                  <Nav.Link onClick={() => dispatch(userLogout())}>
                    <i className="fas fa-user"></i> Logout
                  </Nav.Link>
                )}
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
