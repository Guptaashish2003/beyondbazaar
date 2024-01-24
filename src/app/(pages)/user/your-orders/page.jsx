"use client"
import React, { useEffect, useState } from 'react'
import OrderStatus from '@/components/OrderStatus/OrderStatus'
import { useGetDataProtected } from '@/redux/api/useGetData'
import Loading from '@/app/loading'

const page =  () => {
  const [loading,setLoading] = useState(true)
  const [order,setOrder] = useState([])
  useEffect(()=>{
    getData()
    setLoading(false)
  },[])
  const getData = async ()=>{
    try {
      const res = await useGetDataProtected("/api/user/order/all-orders");
      if(res.success){
     
        setOrder(res.data);
      }
    } catch (error) {
      
    }
  }
  if(loading){
    return(<Loading></Loading>)
  }
  return (
    <div className="py-4 mt-32 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto min-h-screen">
    <div className="flex justify-start item-start space-y-2 flex-col">
      <p className="text-lg md:text-xl  dark:text-black font-semibold leading-6 xl:leading-5 text-gray-800">
        Your Orders
      </p>
    </div>
        {order.map((val,index)=><OrderStatus key={val._id} id={val._id} mainId={val.mainId} productId={val.product._id} status={val.status} slug={val.product.slug} total={val.product.productPrice} title={val.product.productName} img={val.product.productImage[0]}   />)}
    </div>
  )
}

export default page