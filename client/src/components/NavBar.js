import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = {
  margin: "0 10px",
  textDecoration: "none",
  color: "white",
};

const activeLinkStyle = {
  fontWeight: "bold",
  color: "yellow",
};

export default function NavBar() {
  return (
    <nav
      style={{
        backgroundColor: "gray",
        height: "50px",
        textAlign: "center",
        paddingTop: "10px",
        margin: "0 0 10px 0",
      }}
    >
      <NavLink
        to="/"
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        Home
      </NavLink>
      {" | "}
      <NavLink
        to="/create"
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        Create Employee
      </NavLink>
      {" | "}
      {/* Outside React-Router */}
      <a
        href="/about.html"
        style={linkStyle}
        target="_blank"
        rel="noopener noreferrer"
      >
        About
      </a>
      {" | "}
    </nav>
  );
}
