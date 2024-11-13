import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./contexts/UserProvider/index.jsx";
import AppProvider from "./components/AppProvider/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <UserProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </UserProvider>
  // </React.StrictMode>
);
