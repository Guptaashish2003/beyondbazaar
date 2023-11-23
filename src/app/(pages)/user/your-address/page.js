"use client"
import React from "react";
import { FaPlus } from "react-icons/fa";
import Addresses from "@/components/Adresses/Addresses";

import Link from "next/link";

const page = () => {

  return (
    <div className="mt-40  max-lg:mt-24 mx-auto w-3/4">
      <h1 className=" text-gray-900 my-8 text-2xl font-semibold">Your Addresses</h1>
      <div className="flex   flex-wrap gap-5">
      <Link href="/address" className="flex flex-col w-[16rem]  items-center rounded-sm cursor-pointer justify-center text-center border-dashed border-2 border-gray-500">
        <FaPlus className="w-8 h-8" />
        <p className="text-gray-500 text-sm">Add New Address</p>
      </Link>
        <Addresses/>
        <Addresses/>
        <Addresses/>
        <Addresses/>
      </div>
    </div>
  );
};

export default page;
