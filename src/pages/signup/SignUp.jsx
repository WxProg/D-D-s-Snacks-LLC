import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/users/signup",
        userCredentials
      );
      console.log("Response from server:", response.data);
      console.log("It connected successfully.");
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <div className="signup-layout">
      <h1>Yuh Ready fi Signup?</h1>
      <form className="signup-form" onSubmit={handleClick}>
        <input
          name="fName"
          onChange={handleChange}
          type="text"
          placeholder="First Name"
          value={userCredentials.fName}
        />
        <input
          name="lName"
          onChange={handleChange}
          type="text"
          placeholder="Last Name"
          value={userCredentials.lName}
        />
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email Address"
          value={userCredentials.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={userCredentials.password}
          autoComplete="off"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
