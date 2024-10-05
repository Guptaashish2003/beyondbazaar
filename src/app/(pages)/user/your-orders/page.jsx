"use client"
import React, { useEffect, useState } from 'react'
import OrderStatus from '@/components/OrderStatus/OrderStatus'
import { useGetDataProtected } from '@/redux/api/useGetData'
import Loading from '@/app/loading'
import { errorTostHandler } from '@/redux/api/errorTostHandler'
import { useRouter } from 'next/navigation'

const page =  () => {
  const [loading,setLoading] = useState(true)
  const [order,setOrder] = useState([])
  const router = useRouter()
  useEffect(()=>{
    getData()
    setLoading(false)
  },[])
  
  const getData = async ()=>{
    try {
      setLoading(true);
      const res = await useGetDataProtected("/api/user/order/all-orders");
      if(res.success){
        setOrder(res.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      router.back();
      errorTostHandler(error);
    }
  }
  if(loading){
    return(<Loading></Loading>)
  }
  return (
    <div className="py-4 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto navMargin minScreen">
    <div className="flex justify-start item-start space-y-2 flex-col">
      <p className="text-lg md:text-3xl mx-5  dark:text-black font-semibold leading-6 xl:leading-5 text-gray-800">
        Your Orders
      </p>
    </div >
      <div className='px-6 my-4'>
          {order.map((val,index)=><OrderStatus isVariantAvailable={val.isVariantAvailable} variantDetailId={val.variantDetailId} variantId={val.variantId} key={val._id} id={val._id} mainId={val.mainId} productId={val.product._id} status={val.status} slug={val.product.slug} price={val.price} title={val.product.productName} img={val.product.productImage[0]}   />)}
      </div>
    </div>
  )
}

export default page