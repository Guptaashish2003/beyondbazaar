import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";

const Addresses = () => {
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
        <p className="text-gray-900 text-lg">Ashish Gupta</p>
        <p className="text-gray-900 text-md">AR-62 s/f</p>
        <p className="text-gray-900 text-md">hastsal, uttam nagar</p>
        <p className="text-gray-900 text-md">NEW DELHI, DELHI 110059</p>
        <p className="text-gray-900 text-md">India</p>
        <p className="text-gray-900 text-md">Phone number: +91 9625110498</p>
        <div>
          <button className="bg-none text-blue-500 px-2 py-1 rounded-sm">
            Edit
          </button>
          |
          <button className="bg-none text-blue-500 px-2 py-1 rounded-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
