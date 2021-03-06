/*
    Madrid 2020
    Desarrollado por:
   Mario Canales : https: //github.com/DrunkPsyduck
   License: MIT
*/
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Componentes/App/App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
