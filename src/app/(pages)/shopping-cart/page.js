"use client"
import { HiOutlineShoppingBag } from "react-icons/hi2";
import React, { useEffect } from "react";
import PriceCheckOut from "@/components/shoppingCart/PriceCheckOut";
import CartDetail from "@/components/shoppingCart/CartDetail";
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart } from "@/redux/action/cartServices";
import Loading from "@/app/loading";
import { useRouter } from 'next/navigation'
const ShoppingCart = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {loading,cart,error} = useSelector((state) => state.cart.userCart)
  const {noOfProduct} = useSelector((state) => state.cart)
  useEffect(()=>{
    dispatch(getUserCart())
       
  },[])
  if (loading) {
    return Loading();
  }
  if(error){
    router.push("/")
  }
  
  return (
    <>
      <section className="flex flex-col lg:mt-[--nav-spc] mt-12">
        <div className="flex gap-3 justify-center align-center text-3xl my-4 ">
          <span className="relative">
            <div className="absolute flex justify-center items-center text-sm top-0 right-0 w-4 h-4 rounded-full bg-[#333] text-white">{noOfProduct}</div>
            <HiOutlineShoppingBag />
          </span>
        <p>My Bag</p>
        </div>
        <div className="flex w-full flex-wrap  justify-between h-[100%] flex-wap">
          <div className="w-[60%] max-lg:w-full max-lg:px-20 max-md:px-5 "> 
          {cart?.map((items)=><CartDetail id={items._id}  key={items._id} title={items.productID.productName} price={items.productID.productPrice} stock={items.productID.productQuantity} quantity={items.productQuantity} img={items.productID.productImage[0]} cart={cart} loading={loading}/>)}
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