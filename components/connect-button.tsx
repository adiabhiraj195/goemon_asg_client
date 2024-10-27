'use client';

import { useWallet } from '@/contexts/WalletProvide';
import walletImg from '../assets/wallet.png'
import Image from 'next/image';

const ConnectWalletButton: React.FC = () => {
    const { account, connectWallet, disconnectWallet, isConnected } = useWallet();
    // console.log(account)
    return (
        <div>
            {isConnected ? (
                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1'>
                        <Image src={walletImg} className='w-4 h-4' alt="wallet" />
                        <p className={""}>{account?.slice(0, 6)}...</p>
                    </div>
                    <button
                        onClick={disconnectWallet}
                        className={`hover:bg-gradient-to-l hover:from-fuchsia-200 hover:to-sky-300 btn rounded-l text-2xl text-center`}
                    >
                        Disconnect Wallet
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        onClick={connectWallet}
                        className={`hover:bg-gradient-to-l hover:from-fuchsia-200 hover:to-sky-300 btn rounded-l text-2xl text-center w-48`}
                    >
                        Connect Wallet
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConnectWalletButton;