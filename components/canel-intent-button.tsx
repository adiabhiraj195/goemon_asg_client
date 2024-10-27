import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '@/contexts/WalletProvide';
import { GOEMON_ABI, GOEMON_CONTRACT_ADDRESS } from '@/contracts/goemon-contract';

interface CancelIntentButtonProps {
    index: string
    user: string
}

const CancelIntentButton: React.FC<CancelIntentButtonProps> = ({ index, user }) => {
    const { account, signer } = useWallet();
    const [loading, setLoading] = useState(false);

    const cancelIntent = async () => {
        if (!signer) {
            alert("Connect wallet")
            return
        }
        setLoading(true);
        const contract = new ethers.Contract(GOEMON_CONTRACT_ADDRESS, GOEMON_ABI, signer);

        try {
            const tx = await contract.cancelIntent(index);
            await tx.wait();
            alert("Intent Canceled")
        } catch (error) {
            console.log(error)
            alert("Something went wrong")
        }
        setLoading(false)
    }
    return (
        <button
            onClick={cancelIntent}
            disabled={user.toLowerCase() !== account?.toLowerCase()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? "Canceling..." : "Cancel Intent"}
        </button>
    );
};

export default CancelIntentButton;