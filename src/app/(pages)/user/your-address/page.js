"use client"
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Addresses from "@/components/Adresses/Addresses";
import Link from "next/link";
import { useGetDataProtected } from "@/redux/api/useGetData";
import Loading from "@/app/loading";
import { errorTostHandler } from "@/redux/api/errorTostHandler";

const page =  () => {
  const [address,setAddress] = useState([])
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    getAddress()
  },[])
  
  const getAddress = async () => {
    try {
      const res = await useGetDataProtected("/api/user/address/me");
      setLoading(false);
      if(res.success){
        setAddress(res.data)
      }
    } catch (error) {
      setLoading(false);
      errorTostHandler(error);

    }
  }
  if(loading){
    return(<Loading/>);
  }
  
  return (
    <div className=" mx-auto p-12 w-3/4 navMargin minScreen">
      <h1 className=" text-gray-900 my-8 text-2xl font-semibold">Your Addresses</h1>
      <div className="flex   flex-wrap gap-5 max-md:justify-center">
      <Link href="/address/add-new-address" className="flex flex-col h-[16rem] w-[16rem]  items-center rounded-sm cursor-pointer justify-center text-center border-dashed border-2 border-gray-500">
        <FaPlus className="w-8 h-8" />
        <p className="text-gray-500 text-sm">Add New Address</p>
      </Link>
      {address.map((ads)=><Addresses className='w-[16rem] ' setAddress={setAddress} key={ads._id} id={ads._id} name={ads.name} email={ads.email} number={ads.number} street={ads.street} district={ads.District} state={ads.state} city={ads.city} country={ads.county} pincode={ads.pincode} 
       />)}
      </div>
    </div>
  );
};

export default page;
