"use client";

import axios from "axios";
import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const {orderDetails} = useParams();
  console.log(orderDetails);
  const orderId = orderDetails[0];
  let status = "";

  const onRelode = async () => {
    try {
      // Fetch payment status
      const res = await axios.get(
        `/api/user/payment/status/${orderId}`
      );
      const data = res.data.data;
      status = data?.data?.payment_status;
      const payment_method = data.data.payment_method;
      const updatedData = await axios.put(
        `/api/user/order/update`,
        { data: data, payment_method: payment_method }
      );
      setTimeout(() => {
        router.push("/user/your-orders");
      }, 5000);
    } catch (error) {
        router.push("/user/your-orders");
      console.error("An error occurred:", error);
    }
  };

  onRelode();

  return (
    <div className="h-[50vh]  text-center m-auto p-32 text-2xl">
      <p>Order ID: {orderId}</p>
      <p >Status: success</p>
    </div>
  );
};

export default Page;
