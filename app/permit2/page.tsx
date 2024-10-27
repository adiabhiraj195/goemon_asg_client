"use client"
import { useState } from 'react';
import { ethers } from 'ethers';
import { GOEMON_ABI, GOEMON_CONTRACT_ADDRESS } from '@/contracts/goemon-contract';
import { Test_Token_Abi } from '@/contracts/test-token-abi';
import { useWallet } from '../../contexts/WalletProvide';
import {
    // AllowanceTransfer,
    SignatureTransfer,
    PERMIT2_ADDRESS,
    // MaxAllowanceTransferAmount
} from '@uniswap/permit2-sdk';
import Loading from '@/components/Loading';

export default function Permit2ApprovalFlow() {
    const { provider, account, signer } = useWallet();

    const [tokenAddress, setTokenAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [receiver, setReceiver] = useState('');
    const [token, setToken] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    // const [signature, setSignature] = useState<string | null>(null);
    // const [nonce, setNonce] = useState<number | null>(null);
    // const [deadline, setDeadline] = useState<number | null>(null);

    function calculateEndTime(duration: number) {
        return Math.floor((Date.now() + duration) / 1000);
    }

    const signatureTransfer = async () => {
        if (!provider || !signer || !account) return;
        if (!tokenAddress || !receiver || !amount) return
        try {
            setLoading(true)
            setMsg("")
            const nonce = Math.floor(Math.random() * 1e15);
            const deadline = calculateEndTime(30 * 60 * 1000);
            // setNonce(nonce)
            // setDeadline(deadline)

            const amountparsed = ethers.parseUnits(amount, 18);

            const permit = {
                permitted: {
                    token: tokenAddress,
                    amount: amountparsed
                },
                spender: GOEMON_CONTRACT_ADDRESS,
                nonce: nonce,
                deadline: deadline
            };

            const network = await provider?.getNetwork();
            const chainId = network?.chainId;
            console.log("ChainID:", chainId);

            const { domain, types, values } = SignatureTransfer.getPermitData(permit, PERMIT2_ADDRESS, chainId as any);
            console.log(domain, types, values)
            const signature = await signer?.signTypedData(domain as any, types, values);
            // setSignature(signature as string)
            console.log("Signature:", signature);

            const contract = new ethers.Contract(GOEMON_CONTRACT_ADDRESS, GOEMON_ABI, signer);

            const tx = await contract.transferWithPermit(tokenAddress, receiver, amountparsed, nonce, deadline, signature);
            console.log("Transfer with permit tx sent:", tx.hash);
            await tx.wait();
            console.log("Tx confirmed");
            setMsg("Token has been sent")
        } catch (e) {
            console.log(e)
            setMsg("Something goes wrong")
        } finally {
            setLoading(false);

        }
    }

    const approveTokenToPermit = async () => {
        if (!token) return
        setLoading(true);
        const tokenContract = new ethers.Contract(token, Test_Token_Abi, signer)
        try {
            const tx = await tokenContract.approve(PERMIT2_ADDRESS, ethers.MaxUint256);
            console.log("Approval Tx sent:", tx.hash);
            await tx.wait();
            setMsg("Approval Tx Confirmed");
            setToken("")
        } catch (error) {
            console.error("approveTokenPermit2 error:", error);
            // throw error;
            setMsg("somthing goes wrong")
        } finally {
            setLoading(false);
        }

    }
    return (
        <div className="permit-flow flex flex-col justify-center items-center">
            {msg && <p>{msg}</p>}
            {loading && <Loading />}
            {/* token approval to permit2   */}
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl my-4'>Approve Token to Permit2 If Transfering First Time </h1>
                <div>
                    <div className='flex '>
                        <label htmlFor='token-address'>Token Address: </label>
                        <input
                            id='token-address'
                            type="text"
                            value={token}
                            required
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Enter token address"
                            className='bg-transparent outline px-2'
                        />
                    </div>

                    <button onClick={approveTokenToPermit} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
                        Approve Tokens
                    </button>
                </div>

            </div>

            <div className='bg-gray-500 h-1 w-full my-4' />

            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl mb-4'>Sign and send Tx to Receiver</h1>
                <div className='w-full my-1'>
                    <label>Token Address: </label>
                    <input
                        type="text"
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        placeholder="Enter token address"
                        className='bg-transparent outline px-2 w-full'
                    />
                </div>
                <div className='w-full my-1'>
                    <label>Amount: </label>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className='bg-transparent outline px-2 w-full'
                    />
                </div>
                <div className='w-full my-1'>
                    <label>Receiver Address: </label>
                    <input
                        type="text"
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        placeholder="Enter receiver address"
                        className='bg-transparent outline px-2 w-full'

                    />
                </div>
                <button
                    onClick={signatureTransfer}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md my-2"
                >
                    Sign Permit and send TX
                </button>
            </div>
        </div>
    );
}