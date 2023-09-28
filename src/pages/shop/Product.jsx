import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";

const Product = (props) => {
  const navigate = useNavigate();

  const { id, productName, productImage, price } = props.data;

  const { addToCart, cartItems, isAuthenticated } = useContext(ShopContext);

  const cartItemAmount = cartItems[id];
  return (
    <div className="product">
      <img src={productImage} alt="" />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>${price}</p>
      </div>
      <button
        className="addToCartBttn"
        onClick={() => {
          if (isAuthenticated) {
            addToCart(id);
          } else {
            navigate("/signin");
          }
        }}
      >
        Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
      </button>
    </div>
  );
};

export default Product;
