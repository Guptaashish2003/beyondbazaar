"use client"
import React  from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import OrderButton from "./OrderButton";
import {AiOutlineShoppingCart} from "react-icons/ai"
import {FiFastForward} from "react-icons/fi"
import SocialMedial from "@/components/SocialMediaIcons/SocialMedial";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import {incNum,decNum} from '@/redux/action/index'
const ProductDes = () => {
  const myState = useSelector((state) => state.incDec);
  const dispatch = useDispatch();
  return (
    <div className="p-8   w-1/2 max-lg:w-full ">
      <div className="  my-4 text-bold mr-4">
        <h1 className="title text-4xl my-1 font-bold max-lg:text-center">
          Samsung curved display
        </h1>
        <p className="para text-center text-base ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem odio
          eaque error ullam optio quod corporis.
        </p>
        
          <span className="inline-block my-1 text-[--first-color] font-bold text-xl cursor-text max-lg:my-3">
          <LiaRupeeSignSolid className="text-[--first-color] inline font-bold" /> <p className="border-b-2 inline border-slate-400 border-solid ">2999</p>
          </span>
        <hr className="mt-8 border border-slate-200" />
      </div>
        <div className=" flex text-xl text-black gap-4 items-center container  p-4 ">
          <p>Quantity:</p>
          <div className="border-2 border-solid border-slate-300 text-2xl">
            <button onClick= {() => dispatch(decNum())}  className="px-4 py-1">-</button>
            <span className="px-4 py-1"> {myState} </span>
            <button  onClick= {() =>dispatch(incNum())} className="px-4 py-1">+</button>
          </div>
        </div>
        <OrderButton className="font-bold cartAnimation w-11/12 h-12 border-2 border-solid border-slate-400 text-xl" cart={"Add To Cart"}> <AiOutlineShoppingCart className="cartmotion w-6 h-auto"/></OrderButton>
        <OrderButton className="font-bold  orderBounce w-11/12 h-12 border-2 border-solid border-slate-400 text-xl bg-black text-white" cart={"Order Now"}> <FiFastForward className="arrowAnime w-6 h-auto"/></OrderButton>
      <div className="flex gap-5 mt-20">
        <span className="text-xl"> share:</span>
        <SocialMedial hover={"hover:text-black"} className='gap-4 text-xl' facebook={"https://www.facebook.com/"} instagram={true} twitter={true} linkedin={true}/>
      </div>        
      </div>
  );
};

export default ProductDes;
