import React, { createContext, useState } from "react";
import PRODUCTS from "../products";

// Define the context first
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };
  const addToCart = (itemId) => {
    setCartItems((prevItem) => ({
      ...prevItem,
      [itemId]: prevItem[itemId] + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItem) => {
      const newCount = prevItem[itemId] - 1;
      return {
        ...prevItem,
        [itemId]: newCount < 0 ? 0 : newCount,
      };
    });
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prevItem) => ({ ...prevItem, [itemId]: newAmount }));
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;