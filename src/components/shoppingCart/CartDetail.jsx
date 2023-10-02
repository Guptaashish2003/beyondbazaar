import React from "react";
import { MdDelete,MdModeEdit } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";

import productImg from "@/assets/productImag1.jpg";

import Image from "next/image";

const CartDetail = () => {

  return (
    <div className="flex ml-4 mr-4 border-2 border-solid mt-3 border-slate-300 justify-self-auto w-11/12 h-[13rem] p-4">
      <Image src={productImg} alt="Product image" className="w-[20%] h-full " />
      <div className="flex flex-col ml-2 h-[11rem] justify-end gap-3">
        <MdModeEdit className="hover:scale-125 duration-300 cursor-pointer"/>
        <MdDelete className="hover:scale-125 duration-300 cursor-pointer"/>
        <AiOutlineHeart className="hover:scale-125 duration-300 cursor-pointer transition-colors hover:text-red-700 "/>
      </div>
      <div className=" text-black pl-1">
        <p className="font-bold">Lorem ipsum dolor sit amet</p>
        <p>Color : White/Pink</p>
        <p>Size : White/Pink</p>
        <p>In Stock</p>
      </div>
      <div className="pl-2 ml-auto text-black">
        <h2 className="font-bold ">Price</h2>
        <p> 500 </p>
      </div>
      <div className=" ml-auto w-[5.5rem] flex flex-col text-center text-black ">
        <p className="font-bold">Quantity</p>
        <div className="border-2 border-solid border-slate-300 ">
          <button className="px-2 py-1">
            -
          </button>
          <span className="px-1 py-1">0</span>
          <button  className="px-2 py-1">
            +
          </button>
        </div>
      </div>
      <total className="flex flex-col ml-auto text-left text-black pl-2">
        <p className="font-bold">Total</p>
        <p>50000</p>
      </total>
      <hr className="py-3" />
    </div>
  );
};

export default CartDetail;
