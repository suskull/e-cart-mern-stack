import React from "react";
import {LinkContainer} from 'react-router-bootstrap'
import {
  Container,
  Navbar,
  Nav,
} from "react-bootstrap";
const Header = () => {
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
           <Navbar.Brand>Batman</Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to='/cart'>
              <Nav.Link >
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
              <Nav.Link >
                <i className="fas fa-user"></i> Signin
              </Nav.Link>
              </LinkContainer>
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;