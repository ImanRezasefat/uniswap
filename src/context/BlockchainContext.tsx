// WalletContext.js
import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum?: {
      isMetaMask: boolean;
      request: (...args: any[]) => Promise<void>;
    };
  }
}
interface WalletContextType {
  wallet: {
    address?: string;
    web3?: Web3;
  };
  setWallet: React.Dispatch<
    React.SetStateAction<{ address?: string; web3?: Web3 }>
  >;
  transactions: any[]; // Define a more specific type if possible
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>; // Define a more specific type if possible
  loading: boolean;
  connectWallet: () => void;
}
export const WalletContext = createContext<WalletContextType>({
  wallet: {},
  setWallet: () => {},
  transactions: [],
  setTransactions: () => {},
  loading: true,
  connectWallet: () => {},
});

export const WalletProvider = ({ children }: any) => {
  const [wallet, setWallet] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const connectWallet = () => {
    if (typeof window?.ethereum !== undefined) {
      const web3 = new Web3(window?.ethereum);
      try {
        // Request account access
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            setWallet({
              address: accounts[0],
              web3: web3,
            });
            setLoading(false);
          })
          .catch((error) => {
            console.error("User denied account access", error);
            setLoading(false);
          });
      } catch (error) {
        console.error("Failed to load web3, accounts, or contract", error);
        setLoading(false);
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
        transactions,
        setTransactions,
        loading,
        connectWallet,
      }}>
      {children}
    </WalletContext.Provider>
  );
};
