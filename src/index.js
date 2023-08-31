import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // MAIN APP COMPONENT
import "./index.css";
import { AuthProvider, UserProvider } from "./components/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
