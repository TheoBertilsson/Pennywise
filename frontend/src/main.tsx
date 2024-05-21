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
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/budget",
    element: <Budget />,
  },
  {
    path: "/insight",
    element: <Insight />,
  },
  {
    path: "/transaction",
    element: <Transactions />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
