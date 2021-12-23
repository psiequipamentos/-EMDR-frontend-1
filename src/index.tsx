import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import Chat from "./components/chat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
    {/* <Chat></Chat> */}
  </React.StrictMode>,
  document.getElementById("root")
);
