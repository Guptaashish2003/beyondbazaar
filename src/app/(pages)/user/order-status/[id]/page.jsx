"use client"
import React, { useEffect, useState } from 'react'
import OrderDetail from "@/components/OrderStatus/OrderDetail";
import ShippingDetail from "@/components/OrderStatus/OrderTools/ShippingDetail";
import { useGetDataProtected } from '@/redux/api/useGetData'
import Loading from '@/app/loading'
import { useParams, useSearchParams } from 'next/navigation';
import { errorTostHandler } from "@/redux/api/errorTostHandler";
import PriceCheckOut from '@/components/shoppingCart/PriceCheckOut';
const page = () => {
  const [loading,setLoading] = useState(true)
  const [order,setOrder] = useState();
  const [product,setProduct] = useState();
  const {id} = useParams();
  const searchParams = useSearchParams()
  const productId = searchParams.get('orderId');
  useEffect(()=>{
    getData()
  },[])

  const getData = async ()=>{
    try {
      const res = await useGetDataProtected(`/api/user/order/order-details/${id}`);
      if(res.success){
        setOrder(res.data);
        const data = res.data.orderItems.filter((val)=>{
          return productId === val._id
        })
        setProduct(data[0]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorTostHandler(error)
    }
  };
  if(loading){
    return(<Loading></Loading>)
  }
  // console.log(order);
  // console.log(product);

  const getOrderStatus = (orderStatus)=>{
    const state = {"pending":1, "processing":3, "shipped":6, "delivered":8, "cancelled":10}
    const val = state[orderStatus]

    return val
  }

  const getVariant = (product)=>{
    let isVariantAvailable = product?.isVariantAvailable;
    let size = null;
    let color = null;
    if(isVariantAvailable){
        product.product.variants.map((variant)=>{
          if(variant?._id === product?.variantId){
            size = variant?.variantType;
            variant?.variantDetails.map((item)=>{
              if(item._id === product.variantDetailId){
                color = item?.color;
              }
            })
          }
        })

    }
    return {isVariantAvailable,variant:{size,color}}

  }
  return (
    <div className="flex flex-col navMargin minScreen">
      <OrderDetail variants={getVariant(product)} status={getOrderStatus(product?.status)} id={id} quantity={product?.qty} title={product?.product.productName} img={product?.product.productImage[0]} discription={product?.product.seo.description} price={product?.price} address={order?.shippingInfo} orderDate={order?.createdAt} orderId={order?.orderId} isCod={order?.isCod} className="w-[65%]"/>
      <div className="w-11/12 max-md:flex-col-reverse max-md:w-full p-4 rounded-md bg-gray-50 flex mx-auto gap-3 ">
        <ShippingDetail />
        <PriceCheckOut className="bg-white mx-auto flex justify-center flex-col w-11/12 items-stretch w- space-y-2
             md:space-y-0 md:space-x-6 xl:space-x-8 " checkoutBtn={false} order={order} btnName="Checkout" total={order?.totalPrice.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })} >
              <div>
              <div className="flex justify-between">
                <p> items Price</p>
                <p>{order?.itemsPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}</p>
              </div>
              <div className="flex justify-between">
                <p>GST Price</p>
                <p>{(order?.itemsPrice*0.18).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p>{(order?.discountAmount*0.18).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}</p>
              </div>

              <div className="flex justify-between">
                <p>Total Price</p>
                <p>{order?.totalPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}</p>
              </div> 

              </div>
          </PriceCheckOut>
      </div>
    </div>
  );
};

export default page;
