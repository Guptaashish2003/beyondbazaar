import React from "react";
import { TiStarFullOutline,TiStarHalfOutline  } from "react-icons/ti";
const ProductReview = ({ className ,reviewData}) => {
  //calculate review percentage
  const reviewPercentage = (rating) => {
   const percentage =  Math.ceil((rating / reviewData?.totalReview)* 100);
   return percentage
  };
  return (
    <div
      className={`container max-w-sm items-center h-full text-center bg-white rounded drop-shadow-lg px-5 md:px-0 ${className}`}
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
          <div className="items-center font-bold">{(reviewData?.averageRating).toFixed(1)}/5</div>
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
                  style={isNaN(reviewPercentage(reviewData?.fiveStar) )? {width:0}: {width: `${reviewPercentage(reviewData?.fiveStar)}%`} }
                />
              </div>
              <div className="text-black text-xs">{isNaN(reviewPercentage(reviewData.fiveStar)) ?0 :reviewPercentage(reviewData.fiveStar)}%</div>
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
                  style={isNaN(reviewPercentage(reviewData?.fourStar))? {width:0}: {width: `${reviewPercentage(reviewData?.fourStar)}%`} }
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
                  style={ isNaN(reviewPercentage(reviewData?.threeStar))? {width:0}: {width: `${reviewPercentage(reviewData?.threeStar)}%`} }
                />
              </div>
              <div className="text-black text-xs">{isNaN(reviewPercentage(reviewData?.threeStar))?0:reviewPercentage(reviewData?.threeStar)}%</div>
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
                  style = { isNaN(reviewPercentage(reviewData?.twoStar))? {width:0}: {width: `${reviewPercentage(reviewData?.twoStar)}%`} }
                />
              </div>
              <div className="text-black text-xs">{isNaN(reviewPercentage(reviewData?.twoStar))?0:reviewPercentage(reviewData?.twoStar)}%</div>
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
                  style={ isNaN(reviewPercentage(reviewData?.oneStar))? {width:0}: {width: `${reviewPercentage(reviewData?.oneStar)}%`} }
                />
              </div>
              <div className="text-black text-xs">{isNaN(reviewPercentage(reviewData?.oneStar))? 0: reviewPercentage(reviewData?.oneStar)}%</div>
            </div>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default ProductReview;
