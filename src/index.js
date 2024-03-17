import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Block from "./routes/Block";
import Transactions from "./routes/Transactions";
import Transaction from "./routes/Transaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "block/:blockNumber",
    element: <Block />
  },{
    path: "txns",
    element: <Transactions />
  },{
    path: "txn/:txnHash",
    element: <Transaction />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
