import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function handleChange(event) {
    console.log(event.target.value);
  }

  function handleClick(event) {
    event.preventDefault();
    console.log("I was clicked");
  }

  return (
    <div className="signin-layout">
      <h1>Login Yah Suh</h1>
      <form className="signin-form" onSubmit={handleClick}>
        <input onChange="" type="text" value={userEmail}></input>
        <input onChange="" type="text" value={userPassword}></input>
        <button type="submit">Login</button>
      </form>
      <div className="signup-option">
        Wah gwaan? Nuh account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
