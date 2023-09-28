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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser = () => {
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getTotalCartAmount = () => {
    let subTotalAmount = 0;
    let taxAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        const itemTotal = cartItems[item] * itemInfo.price;
        subTotalAmount = itemTotal;
        taxAmount += itemTotal * itemInfo.tax;
      }
    }
    const totalAmount = subTotalAmount + taxAmount;
    return {
      subTotal: subTotalAmount,
      tax: taxAmount,
      total: totalAmount,
    };
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

  // States and functions are added to the context value so that they can be used in any component.
  const contextValue = {
    isAuthenticated,
    loginUser,
    logoutUser,
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
