import React, { useState } from 'react';
import { ethers } from 'ethers';
import { GOEMON_ABI, GOEMON_CONTRACT_ADDRESS } from '@/contracts/goemon-contract';
import { useWallet } from '@/contexts/WalletProvide';

interface SendTransactionButtonProps {
    intentCreator: string;
    amount: string;
    intentIndex: string;
    blockTimestamp: string;
    frequency: string
}

const SendTransactionButton = ({ intentCreator, amount, intentIndex, blockTimestamp, frequency }: SendTransactionButtonProps) => {
    const [isSending, setIsSending] = useState(false);

    const { signer } = useWallet();
    const parsedAmount = ethers.formatUnits(amount, 18)

    const sendTransaction = async () => {
        if (!signer) {
            alert("Connect wallet");
            return
        }
        try {
            setIsSending(true);

            const contract = new ethers.Contract(GOEMON_CONTRACT_ADDRESS, GOEMON_ABI, signer)

            const tx = await contract.executeIntent(intentCreator, intentIndex, {
                value: amount,

            });
            await tx.wait();
            // Display success message
            alert('Transaction successful!');
        } catch (error) {
            console.error('Transaction error:', error);
            alert('An error occurred while sending the transaction.');
        } finally {
            setIsSending(false);
        }
    };
    // console.log(Date.now(), (Number(blockTimestamp) + Number(frequency)) * 1000)

    return (
        <div>
            <button
                onClick={sendTransaction}
                disabled={Date.now() < (Number(blockTimestamp) + Number(frequency)) * 1000 || !signer}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSending ? 'Sending...' : `Send ${parsedAmount} ETH`}
            </button>
        </div>
    );
};

export default SendTransactionButton;