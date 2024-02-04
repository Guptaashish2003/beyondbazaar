"use client";
import React from "react";
import { TiStarFullOutline,TiStarHalfOutline  } from "react-icons/ti";

const ProductReview = ({ className ,reviewData}) => {
  //calculate review percentage
  const reviewPercentage = (rating) => {
   const percentage =  (rating / reviewData?.totalReview)* 100;
   console.log("revi...................ewData", percentage)
    return percentage
  };

  console.log(reviewPercentage(reviewData?.fiveStar))
 
  
  return (
    <div
      className={`container max-w-sm items-center text-center bg-white rounded drop-shadow-lg px-5 md:px-0 ${className}`}
    >
      <div className="pt-8 font-bold text-2xl tracking-wide">
        Customer reviews
      </div>
      <div className="flex mt-4 justify-center">
        <div className="flex items-center  py-3 px-2.5 space-x-2 leading-none text-center whitespace-nowrap align-baseline text-sm bg-gray-200 text-dark rounded-full">
          <div className="items-center">
            <ul className="flex justify-center">
              <li className="flex items-center justify-center space-x-1">

               {
                  reviewData?.averageRating && Array.from({ length: Math.floor(reviewData?.averageRating) }, (_, index) => (
                    <TiStarFullOutline
                      key={index}
                      className="text-[#eab308] w-4 h-4"
                    />
                  ))
                }
                {
                  reviewData?.averageRating && reviewData?.averageRating % 1 !== 0 && <TiStarHalfOutline className="text-[#eab308] w-4 h-4" />
                  
               }
              </li>
             
            </ul>
          </div>
          <div className="items-center font-bold">{reviewData?.averageRating}/5</div>
        </div>
      </div>
      <div className="text-xs">{reviewData?.data?.length} customer reviews</div>
      <div className="pt-6 flex items-center justify-center">
        <ul className="flex flex-col w-full">
          <li className="flex flex-row">
            <div className="flex mx-auto justify-center items-center space-x-3 p-2 text-center">
              <div className="flex text-black text-xs">
                5
                <TiStarFullOutline className="text-[#eab308] w-4 h-4" />
              </div>
              <div className="w-48 bg-gray-200 h-3 rounded-md">
                <div
                  className="bg-green-600 h-3 rounded-md"
                  style={{ width: `${reviewPercentage(reviewData?.fiveStar)}` }}
                />
              </div>
              <div className="text-black text-xs">{reviewPercentage(reviewData.fiveStar)}%</div>
            </div>
          </li>
          <li className="flex flex-row">
            <div className="flex mx-auto justify-center items-center space-x-3 p-2 text-center">
              <div className="flex text-black text-xs">
                4
                <TiStarFullOutline className="text-[#eab308] w-4 h-4" />
              </div>
              <div className="w-48 bg-gray-200 h-3 rounded-md">
                <div
                  className="bg-green-500 h-3 rounded-md"
                  style={{width: reviewPercentage(reviewData?.fourStar)}}
                />
              </div>
              <div className="text-black text-xs">{reviewData?.fourStar}%</div>
            </div>
          </li>
          <li className="flex flex-row">
            <div className="flex mx-auto justify-center items-center space-x-3 p-2 text-center">
              <div className="flex text-black text-xs">
                3
                <TiStarFullOutline className="text-[#eab308] w-4 h-4" />
              </div>
              <div className="w-48 bg-gray-200 h-3 rounded-md">
                <div
                  className="bg-yellow-500 h-3 rounded-md"
                  style={{ width: "15%" }}
                />
              </div>
              <div className="text-black text-xs">15%</div>
            </div>
          </li>
          <li className="flex flex-row">
            <div className="flex mx-auto justify-center items-center space-x-3 p-2 text-center">
              <div className="flex text-black text-xs">
                2
                <TiStarFullOutline className="text-[#eab308] w-4 h-4" />
              </div>
              <div className="w-48 bg-gray-200 h-3 rounded-md">
                <div
                  className="bg-yellow-600 h-3 rounded-md"
                  style={{ width: "12%" }}
                />
              </div>
              <div className="text-black text-xs">10%</div>
            </div>
          </li>
          <li className="flex flex-row">
            <div className="flex mx-auto justify-center items-center space-x-3 p-2 text-center">
              <div className="flex text-black text-xs">
                1
                <TiStarFullOutline className="text-[#eab308] w-4 h-4" />
              </div>
              <div className="w-48 bg-gray-200 h-3 rounded-md">
                <div
                  className="bg-red-500 h-3 rounded-md"
                  style={{ width: "5%" }}
                />
              </div>
              <div className="text-black text-xs">05%</div>
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-3 pb-8 items-center">
        <a
          href="#"
          className="px-2 py-2 text-xs text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-200 hover:text-black"
        >
          View all reviews
        </a>
      </div>
    </div>
  );
};

export default ProductReview;
