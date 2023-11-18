import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";

const Addresses = () => {
  return (
    <div className="flex flex-col justify-between w-40 h-40  items-center rounded-sm cursor-pointer  text-center border-dashed border-2 ring-offset-2 ring-2 ring-gray-500">
      <div className="w-full">
        <Image src={logo} alt="Picture of the author" className="w-8 h-8 mx-auto " />
        <hr className=" border-gray-600 w-full" />
      </div>
      <p className="text-gray-500 text-sm">Add New Address</p>
    </div>
  );
};

export default Addresses;
