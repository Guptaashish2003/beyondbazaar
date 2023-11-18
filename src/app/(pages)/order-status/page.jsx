import React from "react";
import OrderDetail from "@/components/OrderStatus/OrderDetail";
import ShippingDetail from "@/components/OrderStatus/OrderTools/ShippingDetail";
import PriceTotal from "@/components/OrderStatus/OrderTools/PriceTotal";

const page = () => {
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
