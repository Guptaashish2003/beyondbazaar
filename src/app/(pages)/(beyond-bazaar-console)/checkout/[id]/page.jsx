"use client";
import Loading from "@/app/loading";
import SelectAdres from "@/components/PaymentPageTools/SelectAdres";
import SumCard from "@/components/PaymentPageTools/SumCard";
import PriceCheckOut from "@/components/shoppingCart/PriceCheckOut";
import { useGetDataProtected } from "@/redux/api/useGetData";
import { usePostDataProtected } from "@/redux/api/usePostData";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

const PaymentPage = () => {
  const {id} = useParams();
  const searchParams = useSearchParams()
  const router = useRouter()
  const qty = searchParams.get('qty')
  const addressRef = useRef()
  const cart = [1, 2, 4];
  const [address, setAddress] = useState([]);
  const [product, setProduct] = useState([]);
  const [discount, setDiscount] = useState({discountValue:0});

  const [shippingPrice, setShippingPrice] = useState(0);

  const [loading,setLoading] = useState(true)
  const [order,setOrder]= useState();
  useEffect(()=>{
    // setDiscount({discountValue:0})
    getData()
    // test()
  },[])
  const getData = async () => {
    try {
      setLoading(true);
      const res = await useGetDataProtected("/api/user/address/me");
      if(res.success){
        setAddress(res.data)
        console.log(res.data)
      }
      if (id === 'bycart') {
        const res = await useGetDataProtected("/api/cart/my-cart");
        if(res.success){
          const newData = res.data.map((val)=>{return {...val.productID,qty:val.productQuantity}} )
          const newOrder = res.data.map((val)=>{return {product:val.productID._id,qty:val.productQuantity}} )
          setProduct(newData)
          setOrder({orderItems:newOrder,itemsPrice:res.totalprice})
          console.log({orderItems:newOrder,itemsPrice:res.totalprice},'order...')
        }
      } else {
        const res = await useGetDataProtected(`/api/product/single-product/${id}`);
        if(res.success){
          setProduct([{...res.data,qty:qty}]);
          console.log(res.data._id)
          setOrder({orderItems:[{qty:qty,product:res.data._id}],itemsPrice:res.data.productPrice * qty})
        }
      }

      setLoading(false);
    } catch (error) {
      console.log(error)
    } 
  }
  const test = async () => {
    try {
      const res = await useGetDataProtected("/api/user/order/all-orders");
      if(res.success){
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    } 
  }
  const onCheckout = async () => {

    try {
      const res = await usePostDataProtected("/api/user/order/create",{
        orderItems:order.orderItems,discount:discount.disCountId,shippingInfo:addressRef.current.value,itemsPrice:order.itemsPrice,shippingPrice:"0",taxPrice:order.itemsPrice*0.18,totalPrice:(order.itemsPrice*0.18 + order.itemsPrice)
      });
      if(res.success){
        console.log(res.data)
        router.push("/user/your-orders")
      }
    } catch (error) {
      console.log(error)
    } 
  }

  
if(loading){
  return <Loading/>
}
  
  return (
    <section className="flex flex-col navMargin minScreen">
      <div className="flex gap-3 justify-center align-center text-3xl my-4 ">
        <p>Order CheckOut</p>
      </div>
      <div className="flex w-full flex-wrap  justify-between h-[100%] flex-wap">
        <div className="w-[60%] max-lg:w-full max-lg:px-20 max-md:px-5 ">
          <SumCard order={product} />
        </div>
        <div className="w-[35%] px-10 max-lg:w-full max-lg:px-20 max-md:px-5">
          <div>
            <div className="w-full">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Select address
              </label>
              <select
                id="address-select"
                ref={addressRef}
                className="h-14 w-full max-w-full bg-[#333] text-white border rounded-md text-center capitalize"
              >
                {address.map((val,index)=> <option key={index} value={val._id} >{`${val?.street} ${val?.state} ${val?.pincode} ${val?.number}`}</option>)}
              </select>
            </div>
            <Link
              href="/address/add-new-address"
              className="flex flex-col  items-center rounded-sm cursor-pointer justify-center text-center border-dashed border-2 border-gray-500 mt-4"
            >
              <FaPlus className="w-8 h-8" />
              <p className="text-gray-500 text-sm">Add New Address</p>
            </Link>
          </div>
          <PriceCheckOut setDiscount={setDiscount} order={order} total={shippingPrice +discount.discountValue+ order.itemsPrice + (Math.ceil(order.itemsPrice*0.18))} onClick={onCheckout} promo={true} btnName="Checkout" >

              <div className="flex justify-between">
                <p>Total items Price</p>
                <p>₹ {order.itemsPrice}</p>
              </div>
              <div className="flex justify-between">
                <p>GST Price</p>
                <p>₹ {Math.ceil(order.itemsPrice*0.18)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping Price</p>
                <p>₹ {shippingPrice}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p>₹ {discount.discountValue}</p>
              </div>

              <div className="flex justify-between">
                <p>Total Price</p>
                <p>₹ {shippingPrice +discount.discountValue+ order.itemsPrice + (Math.ceil(order.itemsPrice*0.18))}</p>
              </div>
          </PriceCheckOut>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
