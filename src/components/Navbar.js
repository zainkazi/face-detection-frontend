import React from "react";
import logo from "../logo.png";
import "./Navbar.css";

const NavBar = ({ changeRoute, currentRoute }) => {
  if (currentRoute === "signin") {
    return (
      <div className="navbar-container">
        <img className="logo" alt="logo" src={logo} />
        <p
          onClick={() => changeRoute("register")}
          className="route-button b ph3 pv2 ba b--black bg-black white f5 pointer"
        >
          Register
        </p>
      </div>
    );
  } else if (currentRoute === "register") {
    return (
      <div className="navbar-container">
        <img className="logo" alt="logo" src={logo} />
        <p
          onClick={() => changeRoute("signin")}
          className="route-button b ph3 pv2 ba b--black bg-black white f5 pointer"
        >
          Sign In
        </p>
      </div>
    );
  } else if (currentRoute === "home") {
    return (
      <div className="navbar-container">
        <img className="logo" alt="logo" src={logo} />
        <p
          onClick={() => changeRoute("signin")}
          className="route-button b ph3 pv2 ba b--black bg-black white f5 pointer"
        >
          Sign out
        </p>
      </div>
    );
  }
};

export default NavBar;
