import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='flex justify-between items-center p-4 shadow-sm px-10' >
        <Image src={'/logo.png'} alt='logo' width={80} height={40} />
        
        <div>
            <Button className='p-6'>Get Started !</Button>
        </div>
    </div>
  )
}

export default Header