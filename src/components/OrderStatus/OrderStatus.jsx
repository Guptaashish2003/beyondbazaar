import React from "react";
import SingleOrder from "@/components/OrderStatus/OrderTools/SingleOrder";
import Image from "next/image";
import SubmitButton from "../Form/SubmitButton";
import { useRouter } from "next/navigation";

const OrderStatus = ({id,isVariantAvailable,variantId,variantDetailId,title,productId,img,price,status,slug,mainId}) => {
  const orderDetails = [{"title":"place order","value":status},{"title":"price","value":`${price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR'
  })}`},{"title":"Order ID","value":id}]
  const router = useRouter()

  const checkoutValue = ()=>{
    if(isVariantAvailable){
      router.push(`/checkout/${slug}?variant=${variantId}&variantDetails=${variantDetailId}&qty=1`)
    }else(
      router.push(`/checkout/${slug}?qty=1`)
    )
  
  }
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
                <p className="font-bold text-lg max-w-xl max-h-18 max-sm:text-base overflow-hidden text-ellipsis">{title}</p>
                <SubmitButton onClick={checkoutValue} value="Buy it again" className='m-2 px-4 h-8 bg-[#333] text-white rounded-md'></SubmitButton>
                <SubmitButton onClick={()=>router.push(`/single-product/${slug}`)} value="view your item" className='m-2  border-2 px-4 h-8 text-[#333] bg-white rounded-md'></SubmitButton>

              </div>
              <SubmitButton onClick={()=>router.push(`/review/${productId}`)} value="Write a Product Review" className='px-4 h-8 bg-[#333] text-white rounded-md'></SubmitButton>
            </div>
          </div>
          <div className="flex justify-end  flex-wrap gap-x-6 max-sm:justify-end">
            {orderDetails.map((data,index)=><div key={index}>
              <p className="text-[#333] uppercase ">{data.title}</p>
              <p className="capitalize">{data.value}</p>
            </div>)}
            <SubmitButton onClick={()=>router.push(`/user/order-status/${mainId}?orderId=${id}`)} value="view Order Details" className='m-2 max-sm:flex-1 border-2 px-4 h-8 text-[#333] bg-white rounded-md'></SubmitButton>
          </div>
        </div>
  );
};

export default OrderStatus;
