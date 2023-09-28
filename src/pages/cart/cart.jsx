import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PRODUCTS from "../../products";
import { ShopContext } from "../../context/shop-context";
import CartItem from "./CartItem";
import "./cart.css";

const Cart = () => {
  const { cartItems, getTotalCartAmount, isAuthenticated } =
    useContext(ShopContext);

  const { subTotal, tax, total } = getTotalCartAmount();

  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="not-authenticated">
        <h1>Your Cart is empty</h1>
        <Link className="" to="/signin">
          Sign in to your account
        </Link>
        <Link className="" to="/signup">
          Sign up now
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {PRODUCTS.map((product, index) =>
          cartItems[product.id] !== 0 ? (
            <CartItem key={index} data={product} />
          ) : null
        )}
      </div>
      {subTotal > 0 ? (
        <div className="checkout">
          <p>Subtotal:${subTotal.toFixed(2)}</p>
          <p>Taxes:${tax.toFixed(2)}</p>
          <p>Shipping:$</p>
          <p>Total:${total.toFixed(2)}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      ) : (
        <h2>Nothing nuh deh yah. Gwann guh shop!</h2>
      )}
    </div>
  );
};

export default Cart;
