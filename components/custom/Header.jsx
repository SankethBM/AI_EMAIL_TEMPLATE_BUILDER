import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import SignInButton from './SignInButton'

function Header() {
  return (
    <div className='flex justify-between items-center p-4 shadow-sm px-10' >
        <Image src={'/logo.png'} alt='logo' width={80} height={40} />
        
        <div>
            <SignInButton/>
        </div>
    </div>
  )
}

export default Header