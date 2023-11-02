"use client"
import { ToastContainer, toast } from 'react-toastify';

import React from 'react'

function page() {
  const notify = () => toast.success('🦄jjsdjkdj', { autoClose: 2000});
  return (
    <div>
    <button onClick={notify}>Notify!</button>
    
  </div>
  )
}

export default page
