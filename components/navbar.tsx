import React from 'react'
import ConnectWalletButton from './connect-button'
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className='flex items-center justify-between py-2 px-3 w-full border-b border-gray-500 h-fit' >

            <h1 className={` text-2xl italic font-light`}>
                <Link href={"/"}>
                    Goemon
                </Link>
            </h1>

            <div className='flex'>
                <Link href={"/permit2"} className='underline mx-2'>
                    Permit2
                </Link>
                <Link href={"/create-intent"} className='underline mx-2'>
                    Create_Intent
                </Link>
            </div>

            <div className='flex gap-4 items-center'>
                <ConnectWalletButton />
            </div>
        </div>
    )
}
