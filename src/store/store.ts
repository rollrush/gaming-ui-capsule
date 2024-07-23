import { create } from "zustand";
import Capsule, { Environment } from "@usecapsule/react-sdk";

import { capsuleInstance } from "../context/CapsuleContext";
type State = {
  walletAddress: string;
  capsule: Capsule;
  isMenuOpen: boolean;
};

type Action = {
  toggleMenu: () => void;
  checkIfLoggedIn: () => Promise<void>;
  updateWalletAddress: (walletAddress: string | undefined) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useWalletStore = create<State & Action>((set) => ({
  walletAddress: "",
  capsule: new Capsule(Environment.BETA, process.env.CAPSULE_API_KEY),
  isMenuOpen: false,
  checkIfLoggedIn: async () => {
    if (await capsuleInstance.isFullyLoggedIn()) {
      let wallet = Object.values(capsuleInstance.getWallets())[0]?.address;
      set({ walletAddress: wallet });
    } else {
      set({ walletAddress: "Connect Wallet" });
    }
  },
  toggleMenu: () => {
    set((state) => ({ isMenuOpen: !state.isMenuOpen }));
  },
  updateWalletAddress: (walletAddress: string | undefined) => {
    set({ walletAddress });
  },
}));
