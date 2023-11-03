import { HiOutlineShoppingBag } from "react-icons/hi2";
import React from "react";
import PriceCheckOut from "@/components/shoppingCart/PriceCheckOut";
import CartDetail from "@/components/shoppingCart/CartDetail";

const ShoppingCart = () => {
  return (
    <>
      <section className="flex flex-col lg:mt-[--nav-spc] mt-12">
        <div className="flex gap-3 justify-center align-center text-3xl my-4">
        <HiOutlineShoppingBag />
        <p>My Bag</p>
        </div>
        <div className="flex w-full flex-wrap  justify-between h-[100%] flex-wap">
          <div className="w-[60%] max-lg:w-full max-lg:px-20 max-md:px-5 "> 
            <CartDetail />
            <CartDetail />
            <CartDetail />
          </div>
          <div className="w-[35%] px-10 max-lg:w-full max-lg:px-20 max-md:px-5">
            <PriceCheckOut />
          </div>
        </div>
      </section> 
    </>
  );
};

export default ShoppingCart;