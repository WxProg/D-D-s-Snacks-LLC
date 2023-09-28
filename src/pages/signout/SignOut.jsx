import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";

const SignOut = () => {
  const navigate = useNavigate();

  const { logoutUser } = useContext(ShopContext);

  useEffect(() => {
    logoutUser();
    navigate("/");
  });
};

export default SignOut;
