"use client"
import React from "react";
import { FaPlus } from "react-icons/fa";
import Addresses from "@/components/Adresses/Addresses";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const handleNewAddress = () => {
    router.push("/beyond-bazaar-console/address");

  };
  return (
    <div className="mt-40  max-lg:mt-24 mx-auto w-3/4">
      <h1 className=" text-gray-900 my-8 text-2xl font-semibold">Your Addresses</h1>
      <div className="flex   flex-wrap gap-5">

      <div onClick={handleNewAddress} className="flex flex-col w-[16rem]  items-center rounded-sm cursor-pointer justify-center text-center border-dashed border-2 border-gray-500">
        <FaPlus className="w-8 h-8" />
        <p className="text-gray-500 text-sm">Add New Address</p>
      </div>
        <Addresses/>
        <Addresses/>
        <Addresses/>
        <Addresses/>
      </div>
    </div>
  );
};

export default page;
