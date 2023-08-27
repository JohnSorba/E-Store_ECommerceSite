import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // MAIN APP COMPONENT
import "./index.css";
import { AuthProvider } from "./components/AuthContext";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAFHx-hoK6-ogQPckh1-M3BZVSDW3Wadv8 ",
  authDomain: "e-store-f957f.firebaseapp.com",
  projectId: "e-store-f957f",
  storageBucket: "e-store-f957f.appspot.com",
  messagingSenderId: "633284440662",
  appId: "1:633284440662:web:632ec5d84b9583c41f41f7",
};

const app = initializeApp(firebaseConfig);
export default app;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
