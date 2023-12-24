import React from "react";
import SingleOrder from "@/components/OrderStatus/OrderTools/SingleOrder";
import Image from "next/image";
import SubmitButton from "../Form/SubmitButton";
import { useRouter } from "next/navigation";

const OrderStatus = ({id,title,productId,img,total,status,slug,mainId}) => {
  const orderDetails = [{"title":"place order","value":status},{"title":"Total","value":`₹${total}`},{"title":"Order ID","value":"0348820840928904"}]
  const router = useRouter()
  return (
        <div className="flex flex-col border-y-2 border-solid mt-3 border-slate-300 p-6 max-sm:p-2 relative">
          <div className="flex justify-center items-start max-sm:items-center">
            <div className="w-32  h-full my-auto">
              <Image
                src={img}
                height={"500"}
                width={"600"}
                alt="Product image"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex justify-between flex-wrap  p-4 w-full max-sm:flex-col max-sm:items-start max-sm:gap-y-2">
              <div>
                <p className="font-bold text-lg max-w-xl">{title}</p>
                <SubmitButton onClick={()=>router.push(`/checkout/${slug}?qty=1`)} value="Buy it again" className='m-2 px-4 h-8 bg-[#333] text-white rounded-md'></SubmitButton>
                <SubmitButton onClick={()=>router.push(`/user/single-product/${slug}`)} value="view your item" className='m-2  border-2 px-4 h-8 text-[#333] bg-white rounded-md'></SubmitButton>

              </div>
              <SubmitButton value="Write a Product Review" className='px-4 h-8 bg-[#333] text-white rounded-md'></SubmitButton>
            </div>
          </div>
          <div className="flex justify-end flex-wrap gap-x-6 ">
            {orderDetails.map((data,index)=><div key={index}>
              <p className="text-[#333] uppercase">{data.title}</p>
              <p className="capitalize">{data.value}</p>
            </div>)}
            <SubmitButton onClick={()=>router.push(`/user/order-status/${mainId}?orderId=${id}`)} value="view Order Details" className='m-2  border-2 px-4 h-8 text-[#333] bg-white rounded-md'></SubmitButton>
          </div>
        </div>
  );
};

export default OrderStatus;
