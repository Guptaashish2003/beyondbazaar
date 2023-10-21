import React from "react";

import ShippingDetail from "./OrderTools/ShippingDetail";
import PriceTotal from "./OrderTools/PriceTotal";
import SingleOrder from "./OrderTools/SingleOrder";

const OrderStatus = () => {
  return (
    <>
      <div className="py-4 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl  dark:text-black lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Order #13432
          </h1>
          <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
            21st Mart 2021 at 10:34 PM
          </p>
          <p className="text-lg md:text-xl  dark:text-black font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer’s Cart
              </p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-2 md:space-y-3 xl:space-y-0">
          <div className="flex gap-1 max-md:flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col gap-2 w-full">

            <SingleOrder />            
            <SingleOrder />
            </div>
            <div className="w-[31%] max-md:w-full p-2 bg-gray-100 flex flex-col gap-3 lg:relative lg:bottom-8">
              <ShippingDetail/>
             <PriceTotal/>

            </div>
              
          </div>
        
        </div>
      </div>
    </>
  );
};

export default OrderStatus;
