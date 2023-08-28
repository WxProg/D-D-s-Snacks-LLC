import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "jquery";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap"; // bootstrap works better with jquery
import "bootstrap/dist/css/bootstrap.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
