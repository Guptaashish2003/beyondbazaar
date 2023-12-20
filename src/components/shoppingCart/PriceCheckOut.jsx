"use client"
import React, { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import SubmitButton from "../Form/SubmitButton";
const PriceCheckOut = ({btnName,total,promo,...props}) => {
  useEffect(()=>{

  },[total]);
  return (
    <section className="flex  flex-col justify-center border-solid  border-y-2  p-4 mt-16">
      <h1 className="font-bold text-black m-auto text-2xl mb-2">
        Order Summary
      </h1>
      {promo ? (
        <div>
          <p className="py-1"> Enter Promo Code</p>
          <div className="flex justify-between  py-2 gap-1">
            <input
              type="text"
              placeholder="Promo Code"
              className="w-2/3 p-2 border-solid  border-2"
            />
            <SubmitButton
              type="button"
              className="text-white w-1/3 hover:scale-105 duration-300 cursor-pointer bg-black"
              value="Apply"
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex gap-2 flex-col justify-evenly">
        {props.children}
        <div className="flex justify-between font-bold py-2 text-xl">
          <p>Estimated Total</p>
          <p>₹ {total}</p>
        </div>
      </div>

      <SubmitButton
        {...props}
        className="relative  cursor-pointer inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-black border-2 border-gray-600 rounded-md hover:text-white group hover:bg-gray-50"
      >
        <span className="absolute left-0 block w-full h-0 transition-all bg-gray-800 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease" />
        <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
          <AiOutlineShoppingCart className="w-6 h-auto" />
        </span>
        <span className="relative m-auto ">{btnName}</span>
      </SubmitButton>
    </section>
  );
};

export default PriceCheckOut;
