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
  const [order,setOrder] = useState([]);
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
<<<<<<< HEAD
  return (
    <div className="flex flex-col navMargin minScreen">
      <OrderDetail status={4} id={id} title={product?.product.productName} img={product?.product.productImage[0]} discription={product?.product.productDescription} price={product?.product.productPrice} className="w-[65%]"/>
      <div className="w-11/12 max-md:w-full p-4 rounded-md bg-gray-50 flex mx-auto gap-3 ">
=======
  console.log(order)
  return (
    <div className="flex flex-col navMargin minScreen">
      <OrderDetail status={4} orderDate={(order.createdAt)?.slice(0,10)} title={product?.product.productName} img={product?.product.productImage[0]} discription={product?.product.productDescription} price={product?.product?.productPrice} address={order?.shippingInfo} className="w-[65%]"/>
      <div className="w-11/12 max-md:w-full p-4 rounded-md bg-gray-50 flex mx-auto gap-3 max-md:flex-col max-md:justify-center">
>>>>>>> 554f631c3f2b1486e71a55278b928a0806b5dcd2
        <ShippingDetail />
        <PriceCheckOut className="bg-white mx-auto flex justify-center flex-col w-11/12 items-stretch w- space-y-2
             md:space-y-0 md:space-x-6 xl:space-x-8 " checkoutBtn={false} order={order} btnName="Checkout" total={order.totalPrice.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })} >
              <div>
              <div className="flex justify-between">
                <p> items Price</p>
                <p>{order.itemsPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}</p>
              </div>
              <div className="flex justify-between">
                <p>GST Price</p>
                <p>{(order.itemsPrice*0.18).toLocaleString("en-IN", {
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
                <p>{order.totalPrice.toLocaleString("en-IN", {
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
