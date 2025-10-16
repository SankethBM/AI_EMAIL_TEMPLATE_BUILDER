import Image from 'next/image';
import { Button } from '../ui/button';
import React, { useState } from 'react'

function EmailTemplateList() {

    const [emailList, setEmailList] = useState([]);

  return (
    <div>
        <h2 className='font-bold text-xl text-[#FA812F] mt-6' >WorkSpace</h2>

        {emailList?.length==0 && 
            <div className='flex flex-col justify-center mt-7 items-center'>
                <h1 className='font-extrabold text-[#CBCBCB] text-xl'>No Email Template Found !</h1>
                <Image src={'/EmailMarketing.gif'} alt='email' width={350} height={350} />
                <Button className={'p-6  mt-10'} >+ Create New</Button>
            </div>
        }

    </div>
  )
}

export default EmailTemplateList