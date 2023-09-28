import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css";
import { ShopContext } from "../../context/shop-context";

const SignIn = () => {
  const navigate = useNavigate();

  const { loginUser } = useContext(ShopContext);

  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);

  const [loginErrors, setLoginErrors] = useState({});

  /*
   * This mapper function will map the serverMessage that will be returned from sending
   * request to the API. That's the exact error messages in the API.
   */

  const mapServerMessageToLoginErrorState = (serverLoginMessage) => {
    const errorMap = {
      "There was a problem. Your email or password is invalid.": {
        fields: ["email", "password"],
        message: serverLoginMessage,
      },
    };
    return errorMap[serverLoginMessage];
  };

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
    try {
      const response = await axios.post(
        "http://localhost:5000/users/signin",
        userLoginDetails
      );

      if (response.data?.user?.fName) {
        const userFirstName = response.data.user.fName;
        navigate("/", { state: { fName: userFirstName } });

        loginUser(); // The isAuthenticated state in the shop context will be updated to TRUE.
      } else {
        console.log("Unexpected response shape:", response.data);
      }
    } catch (error) {
      const serverLoginMessage = error.response.data.message;
      const errorFields = mapServerMessageToLoginErrorState(serverLoginMessage);

      if (errorFields) {
        let updatedErrors = {};
        errorFields.fields.forEach((field) => {
          updatedErrors[field] = errorFields.message;
        });
        setLoginErrors(updatedErrors);
      }
    }
  };

  return (
    <div className="signin-layout">
      <h1>Login Yah Suh</h1>
      {showRegistrationMessage && (
        <p className="registeredSuccessfully">
          You have been registered successfully!
        </p>
      )}
      {(loginErrors.email || loginErrors.password) && (
        <p className="errorMessage">
          {loginErrors.email || loginErrors.password}
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
          type="password"
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
