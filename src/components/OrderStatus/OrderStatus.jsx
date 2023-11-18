import React from "react";
import SingleOrder from "@/components/OrderStatus/OrderTools/SingleOrder";

const OrderStatus = () => {
  return (
    <>
      <div className="py-4 mt-32 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <p className="text-lg md:text-xl  dark:text-black font-semibold leading-6 xl:leading-5 text-gray-800">
                Your Orders
              </p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-3/4 mx-auto xl:space-x-8 space-y-2 md:space-y-3 xl:space-y-0">
          <div className="flex gap-1 max-md:flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col gap-2 w-full">

            <SingleOrder />            
            <SingleOrder />
            </div>           
          </div>
        
        </div>
      </div>
    </>
  );
};

export default OrderStatus;
