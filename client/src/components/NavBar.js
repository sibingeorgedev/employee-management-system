import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink as RRNavLink } from 'react-router-dom';
import '../styles/navbar.css';
export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={RRNavLink} to="/">
        Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={RRNavLink} to="/create">Create Employee</Nav.Link>
          <Nav.Link href="/about.html" target="_blank" rel="noopener noreferrer">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
