"use client"
import { ToastContainer, toast } from 'react-toastify';

import React from 'react'
import Modal from '@/components/Modal/Modal';

function page() {
  const notify = () => toast.success('🦄jjsdjkdj', { autoClose: 2000});
  return (
    <div>
    <button onClick={notify}>Notify!</button>
    <Modal/>
    
  </div>
  )
}

export default page
