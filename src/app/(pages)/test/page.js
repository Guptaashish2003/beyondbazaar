

import React from 'react'
import Modal from '@/components/Modal/Modal';

function page() {
  console.log(process.env)
  return (
    <div>

    <div className='w-screen h-screen flex justify-center items-center '>

    <Modal btnName='open btn' btnClass="bg-black text-white p-5">
      <div>

      </div>
    </Modal>
    </div>
    
  </div>
  )
}

export default page
