"use client"
import React, { useState, FormEvent } from "react";
import { ethers } from "ethers";
import { GOEMON_ABI, GOEMON_CONTRACT_ADDRESS } from '@/contracts/goemon-contract';
import { useWallet } from "@/contexts/WalletProvide";
import Loading from "@/components/Loading";
// import MonthlyCrossChainTransferSchedulerABI from "../abis/MonthlyCrossChainTransferScheduler.json";

export default function CreateIntent() {
    const { signer } = useWallet();

    const [tokenAddress, setTokenAddress] = useState<string>("");
    const [recipient, setRecipient] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [frequency, setFrequency] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!signer) {
            alert("Please connect your wallet.");
            return;
        }
        setLoading(true);

        try {
            const contract = new ethers.Contract(
                GOEMON_CONTRACT_ADDRESS,
                GOEMON_ABI,
                signer
            );

            const amountInWei = ethers.parseUnits(amount, 18);

            const tx = await contract.createIntent(tokenAddress, recipient, amountInWei, frequency);
            await tx.wait();

            alert("Intent created successfully!");
        } catch (error) {
            console.error("Error creating intent:", error);
            alert("Failed to create intent. Check console for details.");
        }
        // setTokenAddress("");
        // setRecipient("")
        // setAmount("")
        setLoading(false);
    };

    return (
        <div>
            {loading && <Loading />}

            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-6 border shadow-md rounded-md"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Create a Monthly Intent</h2>

                <div className="mb-4">
                    <label htmlFor="token" className="block text-gray-700 font-medium mb-2">
                        Token Address:
                    </label>
                    <input
                        type="text"
                        id="token"
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        placeholder="0xTokenAddress"
                        className=" text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="recipient" className="block text-gray-700 font-medium mb-2">
                        Recipient Address:
                    </label>
                    <input
                        type="text"
                        id="recipient"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="0xRecipientAddress"
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                        Amount (in tokens):
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="100"
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="frequency" className="block text-gray-700 font-medium mb-2">
                        Frequency (in days):
                    </label>
                    <select
                        id="frequency"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required

                    >
                        <option value="300" >5 Min (for test)</option>
                        <option value="604800">1 Week</option>
                        <option value="2592000">1 Month</option>
                        <option value="7776000">3 Months</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    Create Intent
                </button>
            </form>
        </div>
    );
};

