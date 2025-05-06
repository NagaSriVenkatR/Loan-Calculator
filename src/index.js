import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CurrencyProvider } from "./context/currencyContext";
import { AppProvider } from "./context/AppContext"; // 👈 Import your dark mode context

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </CurrencyProvider>
  </React.StrictMode>
);
