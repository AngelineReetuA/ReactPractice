import React from "react";
import ReactDOM from "react-dom/client";
import Hooks from "./Hooks.jsx";
import IndirectMethods from "./IndirectMethods.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <IndirectMethods />
    </BrowserRouter>
  </React.StrictMode>
);
