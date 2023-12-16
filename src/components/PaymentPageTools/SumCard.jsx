import React from "react";

function SumCard({ order }) {
  return (
    <div className="px-4 pt-8">
      <p className="text-xl font-medium inline-block mx-auto">Order Summary</p>
      <p className="text-gray-400 ">
        Check your items. And select a suitable shipping method.
      </p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        {order.map((val,index) => (
          <div key={index} className="flex flex-col rounded-lg bg-slate-100  sm:flex-row ">
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">
                Nike Air Max Pro 8888 - Super Light
              </span>
              <span className="float-right text-gray-400">42EU - 8.5US</span>
              <p className="text-lg font-bold">$138.99</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SumCard;
