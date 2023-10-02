"use client"

import { HiOutlineShoppingBag } from "react-icons/hi2";
import React from "react";
import PriceCheckOut from "./PriceCheckOut";
import CartDetail from "./CartDetail";


const ShoppingCart = () => {

  return (
    <>
      <div className="flex py-3 justify-center text-3xl gap-4 align-center text-black">
        <HiOutlineShoppingBag />
        <p>My Bag</p>
      </div>
      <hr/>
      <div className="flex justify-between h-[100%] ">
        <div className="w-full 11/12">
        <CartDetail />
        <CartDetail />
        <CartDetail />

        </div>
        <div class="h-full border-l border-gray-400"></div>
        <PriceCheckOut />
        
       
      </div>
    </>
  );
};

export default ShoppingCart;