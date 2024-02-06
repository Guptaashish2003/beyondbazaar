"use client"
import Loading from '@/app/loading';
import Modal from '@/components/Modal/Modal';
import { useGetData } from '@/redux/api/useGetData'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { errorTostHandler } from '@/redux/api/errorTostHandler';
 function page() {
    const {id}= useParams();
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [isVerify, setIsVerify] = useState(true);
    useEffect(()=>{
      verify()

    },[loading])
    const  verify = async () => {
      try {
        setLoading(true)
        const data = await useGetData(`/api/user/verifyemail/${id}`)
      setLoading(false);
      if (data.success) {
        setIsVerify(true);
      }
        setIsVerify(false); 

      } catch (error) {
        setLoading(false);
        setIsVerify(false); 
        router.push('/')
        errorTostHandler(error);
        
      }
    }
    
    if (loading) {
      return (
        <Loading/>
      )
    }
  return (
    <div className='w-screen  flex justify-center items-center navMargin minScreen'>
      <Modal withoutBtn={true} onclose={()=>router.push("/login")}>
        <div className='w-[75%]'>
          <h1 className='text-lg font-bold'>{isVerify?'Verification Successful 🎉':"Verification Failed 🚫"}</h1>
          <p>{isVerify?'Your account has been successfully verified. Thank you for ensuring the security of your account.':"We regret to inform you that your account verification was unsuccessful. Please review the provided information and try again."}</p>
          Beyond Bazar
        </div>
      </Modal>
    </div>
  )
}

export default page
