"use client";
import React, { useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiFastForward } from "react-icons/fi";
import SocialMedial from "@/components/SocialMediaIcons/SocialMedial";
import SubmitButton from "../Form/SubmitButton";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/action/Services";
const ProductDes = ({id,title,discription,price,stock,className}) => {
  const [productCount,setProductCount] = useState(1)
  const dispatch = useDispatch()
  const increment = () => {
    if (stock > productCount) {
      setProductCount(productCount+1)
      
    }
    else{
      toast.warn('Out Of Stock', { autoClose: 2000})

    }
  }
  const decrement = () => {
    if (productCount > 0) {
      setProductCount(productCount - 1);
    }
    else{
      toast.warn('somthing was wrong!', { autoClose: 2000})

    }
  }
  
  const addToCartProduct = () => {
    dispatch(addToCart({productID:id,productQuantity:productCount}))
  };
  return (
    <div className={`p-8   w-1/2 max-lg:w-full ${className}`}>
      <div className="  my-4 text-bold mr-4">
        <h1 className="title text-4xl capitalize my-1 font-bold max-lg:text-center">
          {title || 'Samsung curved display'}
        </h1>
        <p className="para text-center text-base ">
          {discription || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem odioerror ullam optio quod corporis"}
        </p>

        <span className="inline-block my-1 text-[--first-color] font-bold text-xl cursor-text max-lg:my-3">
          <LiaRupeeSignSolid className="text-[--first-color] inline font-bold" />{" "}
          <p className="border-b-2 inline border-slate-400 border-solid ">
            {price || 2999}
          </p>
        </span>
        <hr className="mt-8 border border-slate-200" />
      </div>
      <div className=" flex text-xl text-black gap-4 items-center container  p-4 ">
        <p>Quantity:</p>
        <div className="flex border-2 border-solid border-slate-300 text-2xl">
          <button onClick={decrement} className="px-4 py-1">
            -
          </button>
          <span className="px-4 py-1"> {productCount} </span>
          <button onClick={increment} className="px-4 py-1">
            +
          </button>
        </div>
      </div>
      <SubmitButton
        className="my-4 font-bold cartAnimation w-11/12 h-12 border-2 border-solid border-slate-400 text-xl overflow-hidden"
        value={"Add To Cart"}
        onClick={addToCartProduct}
      >
        {" "}
        <AiOutlineShoppingCart className="cartmotion w-6 h-auto" />
      </SubmitButton>
      <SubmitButton
        className="my-4 font-bold  orderBounce w-11/12 h-12 border-2 border-solid border-slate-400 text-xl bg-black text-white"
        value={"Order Now"}
        >
        {" "}
        <FiFastForward className="arrowAnime w-6 h-auto" />
      </SubmitButton>
      
      <div className="flex gap-5 mt-20">
        <span className="text-xl"> share:</span>
        <SocialMedial
          hover={"hover:text-black"}
          className="gap-4 text-xl"
          facebook={"https://www.facebook.com/"}
          instagram={"https://www.facebook.com/"}
          twitter={"https://www.facebook.com/"}
          linkedin={"https://www.facebook.com/"}
          />
      </div>
    </div>
  
  );
};

export default ProductDes;
