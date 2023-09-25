import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./signin.css";

const SignIn = () => {
  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.registered) {
      setShowRegistrationMessage(true);
      const timeoutId = setTimeout(() => {
        setShowRegistrationMessage(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [location.state]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserLoginDetails({ ...userLoginDetails, [name]: value });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    console.log("I was clicked");
    try {
    } catch (error) {}
  };

  return (
    <div className="signin-layout">
      <h1>Login Yah Suh</h1>
      {showRegistrationMessage && (
        <p className="registeredSuccessfully">
          You have been registered successfully!
        </p>
      )}
      <form className="signin-form" onSubmit={handleClick}>
        <input
          name="email"
          onChange={handleChange}
          type="text"
          placeholder="Email Address"
          value={userLoginDetails.email}
        ></input>
        <input
          name="password"
          onChange={handleChange}
          type="text"
          placeholder="Password"
          value={userLoginDetails.password}
        ></input>
        <button type="submit">Login</button>
      </form>
      <div className="signup-option">
        Wah gwaan? Nuh account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
