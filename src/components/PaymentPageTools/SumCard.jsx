import Image from "next/image";
import React from "react";

function SumCard({ order }) {
  console.log(order,"order")
  return (
    <div className="px-4 pt-8">
      <p className="text-xl font-medium inline-block mx-auto">Order Summary</p>
      <p className="text-gray-400 ">
        Check your items. And select a suitable shipping method.
      </p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        {order.map((val,index) => (
          <div key={index} className="flex flex-col rounded-lg bg-slate-100  sm:flex-row ">
            <Image
              src={val?.productImage[0]}
              alt="Product thumbnail"
              height={'500'}
              width={'600'}
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">
                {val?.productName}
              </span>
              <span className="float-right text-gray-400">product Quantity {val?.qty}</span>
              <p className="text-lg font-bold">₹ {val?.productPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SumCard;
