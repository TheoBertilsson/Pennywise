import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Home.tsx";
import Signup from "./signup.tsx";
import Login from "./login.tsx";
import Budget from "./budgetSite.tsx";
import Insight from "./insight.tsx";
import Transactions from "./transactions.tsx";
import Settings from "./settings.tsx";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/budget/:token" element={<Budget />} />
        <Route path="/insight" element={<Insight />} />
        <Route path="/transaction" element={<Transactions />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
