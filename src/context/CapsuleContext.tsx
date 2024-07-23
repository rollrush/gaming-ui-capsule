// src/CapsuleContext.tsx
import { createContext, ReactNode, useContext } from "react";

// capsuleSingleton.ts

import Capsule, { Environment } from "@usecapsule/react-sdk";

// Ensure you replace `process.env.CAPSULE_API_KEY` with your actual API key
export const capsuleInstance = new Capsule(
  Environment.BETA,
  process.env.REACT_APP_CAPSULE_API_KEY
);

const CapsuleContext = createContext(capsuleInstance);

export const CapsuleProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CapsuleContext.Provider value={capsuleInstance}>
      {children}
    </CapsuleContext.Provider>
  );
};

export const useCapsule = () => {
  return useContext(CapsuleContext);
};
