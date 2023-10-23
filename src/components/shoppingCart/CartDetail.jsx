import React from "react";
import { MdDelete,MdModeEdit } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import productImg from "@/assets/productImag1.jpg";
import Image from "next/image";

const CartDetail = () => {

  return (
    <div className="flex flex-col border-y-2 border-solid mt-3 border-slate-300 p-6 max-sm:p-2 relative">
      <div className="flex justify-center items-start max-sm:items-center">
        <div className="w-32 h-full">
          <Image src={productImg} alt="Product image" className="w-full h-full object-contain" />
        </div>

        <div className="flex justify-between  p-4 w-full max-sm:flex-col max-sm:items-start max-sm:gap-y-2">
          <div className="text-[--first-color] pl-1">
            <p className="font-bold">Lorem ipsum dolor sit amet</p>
            <p className="font-bold">₹ 500</p>
            <p>Color : White/Pink</p>
            <p>Size : White/Pink</p>
            <p>In Stock</p>
          </div>
          <div className="pl-2 max-sm:hidden">
            <h2 className="font-bold ">Price</h2>
            <p> 500 </p>
          </div>
          <div className="flex flex-col text-center max-sm:w-full  max-sm:justify-between max-sm:flex-row">
            <p className="font-bold">Quantity</p>
            <div className="border-2 border-solid border-slate-300 ">
              <button className="px-3 py-1">
                -
              </button>
              <span className="px-2 py-1">0</span>
              <button  className="px-3 py-1">
                +
              </button>
            </div>
          </div>
          <total className="flex flex-col text-left  pl-2 max-sm:hidden">
            <p className="font-bold">Total</p>
            <p>50000</p>
          </total>
        </div>

      </div>
      <div className="flex justify-end gap-6 ">
      
        <AiOutlineHeart className="hover:scale-125 duration-300 cursor-pointer transition-colors hover:text-red-700 max-sm:absolute max-sm:top-6 max-sm:right-4"/>
      </div>
    </div>
  );
};

export default CartDetail;
