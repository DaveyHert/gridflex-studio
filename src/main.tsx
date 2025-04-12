import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { LayoutProvider } from "./context/LayoutContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LayoutProvider>
      <App />
    </LayoutProvider>
  </React.StrictMode>
);
