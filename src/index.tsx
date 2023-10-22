import React from "react";
import App from "./App";
import { GlobalStyle } from "./styles/global";
import CountriesProvider from "./context/CountriesContext";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <CountriesProvider>
      <GlobalStyle />
      <App />
    </CountriesProvider>
  </React.StrictMode>
);
