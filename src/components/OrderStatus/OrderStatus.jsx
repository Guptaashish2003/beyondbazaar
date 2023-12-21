import React from "react";
import SingleOrder from "@/components/OrderStatus/OrderTools/SingleOrder";
import Image from "next/image";
import SubmitButton from "../Form/SubmitButton";

const OrderStatus = ({id,title,img,total}) => {
  const orderDetails = [{"title":"place order","value":"place order"},{"title":"Total","value":"₹575"},{"title":"Order ID","value":"0348820840928904"}]
  return (
        <div className="flex flex-col border-y-2 border-solid mt-3 border-slate-300 p-6 max-sm:p-2 relative">
          <div className="flex justify-center items-start max-sm:items-center">
            <div className="w-32  h-full my-auto">
              <Image
                src={"https://source.unsplash.com/random/?electronics&1"}
                height={"500"}
                width={"600"}
                alt="Product image"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex justify-between flex-wrap  p-4 w-full max-sm:flex-col max-sm:items-start max-sm:gap-y-2">
              <div>
                <p className="font-bold text-lg max-w-xl">{"SonicWave Floorstanding Speakers: Immerse yourself in superior audio with SonicWave, floorstanding speakers delivering a powerful and immersive sound experience."}</p>
                <SubmitButton value="Buy it again" className='m-2 px-4 h-8 bg-[#333] text-white rounded-md'></SubmitButton>
                <SubmitButton value="view your item" className='m-2  border-2 px-4 h-8 text-[#333] bg-white rounded-md'></SubmitButton>

              </div>
              <SubmitButton value="Write a Product Review" className='px-4 h-8 bg-[#333] text-white rounded-md'></SubmitButton>
            </div>
          </div>
          <div className="flex justify-end flex-wrap gap-x-6 ">
            {orderDetails.map((data)=><div>
              <p className="text-[#333] uppercase">{data.title}</p>
              <p>{data.value}</p>
            </div>)}
            <SubmitButton value="view Order Details" className='m-2  border-2 px-4 h-8 text-[#333] bg-white rounded-md'></SubmitButton>
          </div>
        </div>
  );
};

export default OrderStatus;
