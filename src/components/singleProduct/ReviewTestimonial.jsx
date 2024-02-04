"use client";
import Image from "next/image";
import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { MdRateReview } from "react-icons/md";
import { useRouter } from "next/navigation";

function ReviewTestimonial({ id,reviewData }) {
  const router = useRouter();
 
  // console.log("reviewData", reviewData);
//  console.log( reviewData[0].createdAt);

  return (
    <div className="w-full">
      { reviewData && reviewData.length > 0 && reviewData.map((review) => (
      <div className="border-y-2 w-full jus flex  gap-x-2 py-4">
        <Image
          alt="image"
          width={50}
          height={50}
          src=""
          className="w-12 h-12 rounded-full object-fill"
        ></Image>
        <div className="w-full " >
          <div className="flex w-full justify-between ">
            <span>
              <p className="font-bold uppercase text-[">{review.userId.name}</p>
              <div className="flex">
                {Array.from({ length: review.rating }, (_, index) => (
                  <TiStarFullOutline
                    key={index}
                    className="text-[#eab308] w-4 h-4"
                  />
                ))}
              </div>
            </span>
            <span>{review.createdAt}
            <MdRateReview className="relative left-[90%] cursor-pointer mt-2 w-6 h-6"
              onClick={() => {
                router.push(`/review/${review.productId}?reviewId=${review._id}`);
                
              }}
            />
            
            </span>
          </div>
          <div className="my-4">
            <h3 className="font-extrabold   text-lg">
             {review.title}
            </h3>
            <p>
             {review.description}
            </p>
          </div>
        </div>
      </div>

      ))


      }
    </div>
  );
}

export default ReviewTestimonial;
