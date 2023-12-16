"use client";
import SelectAdres from "@/components/PaymentPageTools/SelectAdres";
import SumCard from "@/components/PaymentPageTools/SumCard";
import PriceCheckOut from "@/components/shoppingCart/PriceCheckOut";
import { useGetDataProtected } from "@/redux/api/useGetData";
import { usePostDataProtected } from "@/redux/api/usePostData";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

const PaymentPage = () => {
  const addressRef = useRef()
  const cart = [1, 2, 4];
  const [address, setAddress] = useState([]);
  useEffect(()=>{
    getAddress()
    // test()
  },[])
  const getAddress = async () => {
    try {
      const res = await useGetDataProtected("/api/user/address/me");
      if(res.success){
        setAddress(res.data)
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    } 
  }
  const test = async () => {
    try {
      const res = await useGetDataProtected("/api/user/order/all-orders");
      if(res.success){
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    } 
  }
  const onCheckout = async () => {
    console.log(addressRef.current.value)
    try {
      const res = await usePostDataProtected("/api/user/order/create",{
        orderItems:[{
          qty:2,
          product:"65749bafb7b4e0001bb2a2f5"
        }],shippingInfo:"657d4bc95bb18cdbd844ff6e",itemsPrice:"33",shippingPrice:"33",taxPrice:"33",totalPrice:"33"
      });
      if(res.success){
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    } 
  }
  
  
  return (
    <section className="flex flex-col lg:mt-[--nav-spc] mt-12">
      <div className="flex gap-3 justify-center align-center text-3xl my-4 ">
        <p>Order CheckOut</p>
      </div>
      <div className="flex w-full flex-wrap  justify-between h-[100%] flex-wap">
        <div className="w-[60%] max-lg:w-full max-lg:px-20 max-md:px-5 ">
          <SumCard order={cart} />
        </div>
        <div className="w-[35%] px-10 max-lg:w-full max-lg:px-20 max-md:px-5">
          <div>
            <div className="w-full">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Select address
              </label>
              <select
                id="address-select"
                ref={addressRef}
                className="h-14 w-full max-w-full bg-[#333] text-white border rounded-md text-center capitalize"
              >
                {address.map((val,index)=> <option key={index} value={index} >{`${val?.street} ${val?.state} ${val?.pincode} ${val?.number}`}</option>)}
              </select>
            </div>
            <Link
              href="/address/add-new-address"
              className="flex flex-col  items-center rounded-sm cursor-pointer justify-center text-center border-dashed border-2 border-gray-500 mt-4"
            >
              <FaPlus className="w-8 h-8" />
              <p className="text-gray-500 text-sm">Add New Address</p>
            </Link>
          </div>
          <PriceCheckOut onClick={onCheckout} btnName="Checkout" />
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
