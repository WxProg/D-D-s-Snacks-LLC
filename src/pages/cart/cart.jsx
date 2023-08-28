import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PRODUCTS from "../../products";
import { ShopContext } from "../../context/shop-context";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);

  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate(); // Allows use to navigate a different part of our app.
  // It is implemented below when the use clicks the "Continue Shopping" button.
  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {PRODUCTS.map((product) =>
          cartItems[product.id] !== 0 ? <CartItem data={product} /> : null
        )}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Taxes:$</p>
          <p>Shipping:$</p>
          <p>Subtotal:${totalAmount.toFixed(2)}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      ) : (
        <h2>Nothing nuh deh yah. Guh shopping!</h2>
      )}
    </div>
  );
};

export default Cart;
