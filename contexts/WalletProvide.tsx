"use client"

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { ethers } from "ethers";

interface WalletContextType {
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    account: string | null;
    provider: ethers.BrowserProvider | null;
    signer: ethers.Signer | null;
    isConnected: boolean;
    error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);;

    useEffect(() => {
        const autoConnect = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum as any);
                const accounts = await provider.send('eth_accounts', []);
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                }
                // console.log(accounts)
                setIsConnected(true)
            }
        };
        autoConnect();
    }, []);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                setError("MetaMask is not installed!");
                return;
            }

            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            await web3Provider.send("eth_requestAccounts", []); // Request wallet connection
            const signer = await web3Provider.getSigner();
            const walletAddress = await signer.getAddress();
            // console.log(web3Provider.getNetwork())

            setProvider(web3Provider);
            setSigner(signer);
            setAccount(walletAddress);
            setIsConnected(true);
            setError(null);
            // console.log(walletAddress)
        } catch (err) {
            console.error(err);
            setError("Failed to connect wallet");
        }
    };

    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setAccount(null);
        setIsConnected(false);
    };

    return (
        <WalletContext.Provider
            value={{
                connectWallet,
                disconnectWallet,
                account,
                provider,
                signer,
                isConnected,
                error,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};