import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  //div {
  //  display: flex;
  //  flex-direction: column;
  //}
  //
  a {
    text-decoration: none;
  }
  
  h1 {
    font-size: 36px;
  }
  h3 {
    font-size: 32px;
    color: white;
    font-weight: bold;
  }
  h4 {
    font-size: 24px;
    color: white;
    font-weight: normal;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);
