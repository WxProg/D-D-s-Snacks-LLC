import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartSimple, SignIn, SignOut } from "phosphor-react"; // icons library
import "./NavBar.css";
import logo from "../assets/dds-logo.png";

const NavBar = () => {
  return (
    <div className="main-container">
      <div className="main-navbar">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Company Logo" className="logo" />
        </Link>
        <div className="link-group">
          <Link to="/signin">
            <SignIn size={32} />
          </Link>
          <Link to="/">
            <SignOut size={32} />
          </Link>
          <Link to="/">Shop</Link>
          <Link to="/cart">
            <ShoppingCartSimple size={32} />
          </Link>
        </div>
      </div>
      <div className="sub-navbar">
        <Link to="">Beverages</Link>
        <Link to="">Snacks</Link>
        <Link to="">Seasoning / Spices</Link>
        <Link to="">Bakery</Link>
      </div>
    </div>
  );
};

export default NavBar;
