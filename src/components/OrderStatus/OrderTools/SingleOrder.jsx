import React from 'react'
import Image from "next/image";
import productImg from "@/assets/productImag1.jpg";

const SingleOrder = () => {
  return (
      <div className="flex flex-col justify-start items-start max-md:w-full bg-gray-100 px-4 py-1 md:py-6 md:p-1 xl:p-2 w-full">
              
              <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                <div className="pb-4 md:pb-8 w-full md:w-40">
                  <Image
                    src={productImg}
                    alt="Insulated bottle with white base and black snap lid."
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="border-b lg:relative lg:bottom-11 border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-2 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-3">
                    <h3 className="text-xl  dark:text-black xl:text-2xl font-semibold leading-6 text-gray-800">
                      Premium Quaility Dress
                    </h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-sm  dark:text-black leading-none text-gray-800">
                        <span className="dark:text-gray-400 text-gray-300">
                          Style:{" "}
                        </span>{" "}
                        Italic Minimal Design
                      </p>
                      <p className="text-sm  dark:text-black leading-none text-gray-800">
                        <span className="dark:text-gray-400 text-gray-300">
                          Size:{" "}
                        </span>{" "}
                        Small
                      </p>
                      <p className="text-sm  dark:text-black leading-none text-gray-800">
                        <span className="dark:text-gray-400 text-gray-300">
                          Color:{" "}
                        </span>{" "}
                        Light Blue
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base  dark:text-black xl:text-lg leading-6">
                      $36.00{" "}
                      <span className="text-red-300 line-through"> $45.00</span>
                    </p>
                    <p className="text-base  dark:text-black xl:text-lg leading-6 text-gray-800">
                      01
                    </p>
                    <p className="text-base  dark:text-black xl:text-lg font-semibold leading-6 text-gray-800">
                      $36.00
                    </p>
                  </div>
                </div>
              </div>
        </div>
  )
}

export default SingleOrder