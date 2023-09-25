import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PriorityHighRounded } from "@mui/icons-material";
import "./signup.css";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  /*
   * This mapper function will map the serverMessage that will be returned from sending
   * request to the API.
   */
  const mapServerMessageToErrorState = (serverMessage) => {
    const errorMap = {
      "There's already an account with this email.": {
        field: "email",
        message: serverMessage,
      },
      "Password must be at least 8 characters long.": {
        field: "password",
        message: serverMessage,
      },
    };
    return errorMap[serverMessage];
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  const handleClick = async (event) => {
    event.preventDefault();

    // Reset errors before making a request
    // setErrors({});

    try {
      const response = await axios.post(
        "http://localhost:5000/users/signup",
        userCredentials
      );
      console.log("Response from server:", response.data);
      console.log("It connected successfully.");

      navigate("/signin", { state: { registered: true } });
    } catch (error) {
      // console.log("Error submitting form:", error);
      // if (error.response && error.response.data.message) {
      //   alert(error.response.data.message);
      // }
      const serverMessage = error.response.data.message;
      const errorField = mapServerMessageToErrorState(serverMessage);

      // console.log(serverMessage);
      // console.log(errorField);
      // console.log(mapServerMessageToErrorState());
      if (errorField) {
        setErrors((prevState) => ({
          ...prevState,
          [errorField.field]: errorField.message,
        }));
      }
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
        {errors.email && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <PriorityHighRounded color="error" />
            <small className="error-message">
              {errors.email}
              <Link
                className="signInLink"
                style={{ marginLeft: "6px" }}
                to="/signin"
              >
                Sign in
              </Link>
            </small>
          </div>
        )}
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={userCredentials.password}
          autoComplete="off"
        />
        {errors.password && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <PriorityHighRounded color="error" />
            <small className="error-message">{errors.password}</small>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default SignUp;
