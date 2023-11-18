import React from 'react'
import { FaPlus } from "react-icons/fa";

const page = () => {
  return (

    < div className='mt-40 mx-8 w-[80%]'>
    <p className='text-lg text-gray-900 font-semibold' >Your Addresses</p>
    <div className='flex w-40 h-40  items-center rounded-sm cursor-pointer justify-center text-center border-dashed border-2 ring-offset-2 ring-2 ring-gray-500'>
        <FaPlus/>

    </div>
    </div>
  )
}

export default page