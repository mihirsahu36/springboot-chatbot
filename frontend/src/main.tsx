import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <App />

    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,

        style: {
          minWidth: "500px",
          padding: "24px 32px",
          fontSize: "20px",
          fontWeight: "600",
          borderRadius: "20px",
        },
        success: {
          style: {
            background: "#14532d",
            color: "#fff",
          },
        },

        error: {
          style: {
            background: "#7f1d1d",
            color: "#fff",
          },
        },
      }}
    />
  </StrictMode>
);