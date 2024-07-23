import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CapsuleModal } from "@usecapsule/react-sdk";
import { CapsuleProvider } from "./context/CapsuleContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <CapsuleModal> */}
    <CapsuleProvider>
      <App />
    </CapsuleProvider>
    {/* </CapsuleModal> */}
  </React.StrictMode>
);
