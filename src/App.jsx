import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Shop from "./pages/shop/shop";
import Cart from "./pages/cart/cart";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import ShopContextProvider from "./context/shop-context";

export default function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signout" element={""}></Route>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

// <></> : React Fragment tags. Allows you to display multiline without no effect in the dom.
// All "Routes" exists inside of the "Router".
