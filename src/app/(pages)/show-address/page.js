import React from "react";
import { FaPlus } from "react-icons/fa";
import Addresses from "@/components/Adresses/Addresses";

const page = () => {
  return (
    <div className="mt-40 max-lg:mt-24 mx-8 w-[80%]">
      <h1 className=" text-gray-900 my-8 text-2xl font-semibold">Your Addresses</h1>
      <div className="flex gap-5">

      <div className="flex flex-col w-40 h-40  items-center rounded-sm cursor-pointer justify-center text-center border-dashed border-2 ring-offset-2 ring-2 ring-gray-500">
        <FaPlus />
        <p className="text-gray-500 text-sm">Add New Address</p>
      </div>
        <Addresses/>
      </div>
    </div>
  );
};

export default page;
