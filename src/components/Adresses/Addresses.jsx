
"use client"
import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useDeleteData } from "@/redux/api/useDeleteData";
import { toast } from "react-toastify";

const Addresses = ({id,setAddress,name,email,street,state,city,country,district,pincode,number}) => {
  const deleteAdrress = async ()=>{
    try {
      const res = await useDeleteData(`/api/user/address/delete/${id}`)
      if (res.success) {
        setAddress(res.data)
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }
   
  return (
    <div className="flex flex-col justify-evenly w-[16rem]   items-center rounded-sm cursor-pointer  text-center -2 ring-offset-2 ring-2 ring-gray-500">
      <div className="w-full">
        <Image
          src={logo}
          alt="Picture of the author"
          className="w-8 h-8 mx-auto "
        />
        <hr className=" border-gray-600 w-full" />
      </div>
      <div className="flex flex-col justify-start gap-1 items-start w-full p-1">
        <p className="text-gray-900 text-lg">{name}</p>
        <p className="text-gray-900 text-md">{street}</p>
        <p className="text-gray-900 text-md">{city}</p>
        <p className="text-gray-900 text-md">{district}</p>
        <p className="text-gray-900 text-md">{state}-{pincode}</p>
        <p className="text-gray-900 text-md">{country}</p>
        <p className="text-gray-900 text-md">Phone number: +91 {number}</p>
        <div>
          <Link href={`/address/${id}`} className="bg-none text-blue-500 px-2 py-1 rounded-sm">
            Edit
          </Link>
          |
          <button onClick={deleteAdrress}   className="bg-none text-blue-500 px-2 py-1 rounded-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
