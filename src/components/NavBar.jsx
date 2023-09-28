import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCartSimple, SignIn, SignOut } from "phosphor-react"; // icons library
import "./NavBar.css";
import logo from "../assets/dds-logo.png";

const NavBar = () => {
  const [loginUserName, setLoginUserName] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/signout") {
      setLoginUserName("");
    } else if (location.state?.fName) {
      setLoginUserName(location.state?.fName);
    }
  }, [location.pathname, location.state]);

  return (
    <div className="main-container">
      <div className="main-navbar">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Company Logo" className="logo" />
        </Link>
        <div className="link-group">
          {loginUserName ? (
            <>
              <span className="username-display">Welcome, {loginUserName}</span>
              <Link to="/signout">
                <SignOut size={32} />
              </Link>
            </>
          ) : (
            <Link to="/signin">
              <SignIn size={32} />
            </Link>
          )}

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
