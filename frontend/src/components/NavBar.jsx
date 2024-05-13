import React, {useContext} from "react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import LogoutButton from "./LogoutButton";

export default function MyNav(){


  return (
    <>
      <Navbar
        expand="lg"
        bg="dark"
      >
        <Container fluid>
          <Navbar.Brand href="#" className="text-light">StriveBlog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home" className="text-light">Home</Nav.Link>
              <Nav.Link href="/profile" className="text-light">Profilo</Nav.Link>
              <Nav.Link href="/users" className="text-light">Utenti</Nav.Link>
            </Nav>
          </Navbar.Collapse>
            <LogoutButton/>
          
          
        </Container>
      </Navbar>
    </>
  );
};


