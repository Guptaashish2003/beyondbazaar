import React from 'react'

const ShippingDetail = () => {
  return (
    <div className="flex flex-col justify-center px-4  md:p-1 xl:p-2 w-full bg-white  space-y-3">
                <h3 className="text-xl  dark:text-black font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6  dark:text-black font-semibold text-gray-800">
                        DPD Delivery
                        <br />
                        <span className="font-normal">
                          Delivery with 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6  dark:text-black text-gray-900">
                    $8.00
                  </p>
                </div>
                <div className="w-full flex justify-center items-center">
                  <button className="hover:bg-black  py-4  w-96 md:w-full max-md:bg-gray-800 bg-gray-800 text-base font-medium leading-4  max-md:text-white text-white">
                    View Carrier Details
                  </button>
                </div>
              </div>
  )
}

export default ShippingDetail