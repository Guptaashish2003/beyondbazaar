"use client"
import React, { useEffect, useState } from "react";
import { MdDelete,MdModeEdit } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import productImg from "@/assets/productImag1.jpg";
import Image from "next/image";
import { removeFromCart, updateCartItemQty } from "@/redux/action/Services";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import { toast } from 'react-toastify';

const CartDetail = ({dispatch,id,title,img,price,quantity,stock,cart}) => {
  const [productQty, setProductQty] = useState(quantity)
  const [fullScreenLoader , setFullScreenLoader] = useState(false);
  
  useEffect(()=>{
  },[cart])

  const deleteProduct = () => {
    setFullScreenLoader(true)
    dispatch(removeFromCart(id))
  }

  const updatequantity = (action) => {
    setFullScreenLoader(true)
    if (action) {
      if (productQty < stock){
        dispatch(updateCartItemQty({cartItemId:id,productQuantity:productQty+1})).then(() => {
          setFullScreenLoader(false)
          setProductQty(productQty+1);
        })
      }else{
        toast.warn("out of stock quantity")
      }
    }
    else{
      if (productQty > 1){ 
        dispatch(updateCartItemQty({cartItemId:id,productQuantity:productQty-1})).then(() => {
          setProductQty(productQty-1);
          setFullScreenLoader(false)
        })
      }else{
        toast.warn("out of stock quantity")
      }
    }
    
  }

  return (
    <>
    {fullScreenLoader && <FullScreenLoader/>}
    <div className="flex flex-col border-y-2 border-solid mt-3 border-slate-300 p-6 max-sm:p-2 relative">
      <div className="flex justify-center gap-1 items-start max-sm:items-center">
        <div className="w-32 h-full my-auto">
          <Image
            src={img}
            height={"500"}
            width={"600"}
            alt="Product image"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex justify-between  p-4 w-full max-sm:flex-col max-sm:items-start max-sm:gap-y-2">
          <div className="text-[--first-color] pl-1">
            <p className="font-bold w-[90%]">{title}</p>
            <p className="font-bold">
              {price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </p>
            {/* <p>Color : White/Pink</p>
            <p>Size : White/Pink</p> */}
            {stock ? (
              <p className="text-green-500">In Stock</p>
            ) : (
              <p className="text-red-700">Out Of Stock</p>
            )}
          </div>
          <div className="pl-2 max-sm:hidden">
            <h2 className="font-bold ">Price</h2>
            <p>
              {" "}
              {price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}{" "}
            </p>
          </div>
          <div className="flex flex-col text-center max-sm:w-full min-w-28 max-sm:justify-between max-sm:flex-row">
            <p className="font-bold">Quantity</p>
            <div className="border-2 border-solid border-slate-300 ">
              <button
                className="px-2 py-1"
                onClick={() => updatequantity(false)}
              >
                -
              </button>
              <span className="px-2 py-1">{productQty}</span>
              <button
                className="px-1 py-1"
                onClick={() => updatequantity(true)}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col text-left  pl-1 max-sm:hidden">
            <p className="font-bold">Total</p>
            <p>
              {(price * productQty).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-6 ">
        <MdDelete
          onClick={deleteProduct}
          className="hover:scale-125 duration-300 cursor-pointer transition-colors hover:text-gray-600 max-sm:absolute max-sm:top-6 max-sm:right-12 text-xl"
        />
        <AiOutlineHeart className="hover:scale-125 duration-300 cursor-pointer transition-colors hover:text-red-700 max-sm:absolute max-sm:top-6 max-sm:right-4 text-xl" />
      </div>
    </div>
    </>
  );
};

export default CartDetail;
