"use client";
import Addresses from "@/components/Adresses/Addresses";
import SelectAdres from "@/components/PaymentPageTools/SelectAdres";
import SumCard from "@/components/PaymentPageTools/SumCard";
import PriceCheckOut from "@/components/shoppingCart/PriceCheckOut";
import Link from "next/link";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const PaymentPage = () => {
const cart = [1,2,4]
const [bookAdress,setBookAddress] = useState()
  return (
    <section className="flex flex-col lg:mt-[--nav-spc] mt-12">
    <div className="flex gap-3 justify-center align-center text-3xl my-4 ">

    <p>Order CheckOut</p>
    </div>
    <div className="flex w-full flex-wrap  justify-between h-[100%] flex-wap">
      <div className="w-[60%] max-lg:w-full max-lg:px-20 max-md:px-5 "> 
      <SumCard order={cart}/>
      </div>
      <div className="w-[35%] px-10 max-lg:w-full max-lg:px-20 max-md:px-5">
        <div>
          <Addresses withbtn={false} className='mx-auto'/>
          <Link href="/address/add-new-address" className="flex flex-col  items-center rounded-sm cursor-pointer justify-center text-center border-dashed border-2 border-gray-500 mt-4">
            <FaPlus className="w-8 h-8" />
            <p className="text-gray-500 text-sm">Add New Address</p>
          </Link>
        </div>
        <PriceCheckOut btnName='Checkout'/>
      </div>
    </div>
  </section> 
  );
};

export default PaymentPage;
