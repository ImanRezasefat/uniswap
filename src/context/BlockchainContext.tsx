// WalletContext.js
import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";

export const WalletContext = createContext({});

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const connectWallet = () => {
    if (typeof window.ethereum !== undefined) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            console.log("i ran", accounts);
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
