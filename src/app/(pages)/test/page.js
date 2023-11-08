"use client"
import {  toast } from 'react-toastify';

import React from 'react'
import Modal from '@/components/Modal/Modal';

function page() {
  const notify = () => toast.success('🦄jjsdjkdj', { autoClose: 2000});
  return (
    <div>
    <button onClick={notify}>Notify!</button>
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
