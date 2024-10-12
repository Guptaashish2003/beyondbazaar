"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { orderDetails } = useParams();
  console.log(orderDetails, "orderDetails");
  const orderId = orderDetails[0];
  const [status,setStatus] = useState([])

  const onRelode = async () => {
    try {
      // Use absolute URL during SSR
      const baseURL = typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_API_URL;

      // Fetch payment status

      const res = await axios.get(
        `${baseURL}/api/user/payment/status/${orderId}`
      );
      const data = res?.data?.data;
      const status = data.payment_status;
      const payment_method = data.payment_method;
      
      console.log(payment_method,"payment_method");
      const updatedData = await axios.put(
        `${baseURL}/api/user/order/update`,
        { data: data, payment_method: payment_method }
      );
      // setTimeout(() => {
      //   router.push("/user/your-orders");
      // }, 5000);
    } catch (error) {
      // router.push("/user/your-orders");
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    onRelode();
  }, []);

  return (
    <div className="w-screen h-screen top-0 left-0 z-[1000] flex flex-col justify-center items-center text-center m-auto p-32 text-2xl ">
      <p>Order ID: {orderId}</p>
      <p>Status: success</p>
    </div>
  );
};

export default Page;
