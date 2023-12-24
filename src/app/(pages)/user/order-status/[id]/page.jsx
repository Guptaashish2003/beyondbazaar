"use client"
import React, { useEffect, useState } from 'react'
import OrderDetail from "@/components/OrderStatus/OrderDetail";
import ShippingDetail from "@/components/OrderStatus/OrderTools/ShippingDetail";
import PriceTotal from "@/components/OrderStatus/OrderTools/PriceTotal";
import { useGetDataProtected } from '@/redux/api/useGetData'
import Loading from '@/app/loading'
import { useParams, useSearchParams } from 'next/navigation';
const page = () => {
  const [loading,setLoading] = useState(true)
  const [order,setOrder] = useState([]);
  const [product,setProduct] = useState([]);
  const {id} = useParams();
  const searchParams = useSearchParams()
  const productId = searchParams.get('orderId');
  useEffect(()=>{
    getData()
    setLoading(false);
  },[])
  const getData = async ()=>{
    try {
      const res = await useGetDataProtected(`/api/user/order/order-details/${id}`);
      if(res.success){
        setOrder(res.data);
        const data = res.data.orderItems.filter((val)=>{
          return productId === val._id
        })
        setProduct(data);
      }
    } catch (error) {
      console.log(error)
    }
  };
  if(loading){
    return(<Loading></Loading>)
  }
  console.log(product)
  return (
    <div className="flex flex-col ">
      <OrderDetail className="w-[65%]"/>
      <div className="w-11/12 max-md:w-full p-4 rounded-md bg-gray-50 flex mx-auto gap-3 ">
        <ShippingDetail />
        <PriceTotal />
      </div>
    </div>
  );
};

export default page;
