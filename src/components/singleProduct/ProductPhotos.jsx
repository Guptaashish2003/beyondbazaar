"use client";
import Image from "next/image";
import img1 from "@/assets/img1.png";
import img2 from "@/assets/img2.png";
import img3 from "@/assets/img3.png";
import img4 from "@/assets/img4.png";
import { useState } from "react";

const ProductPhotos = () => {
  const productImg = [img1, img2, img3, img4];
  const [mainImg, setMainImg] = useState(productImg[0]);

  return (
    <div className="">
      <div className=" w-1/2 flex  item-center justify-center ">
    <Image src={mainImg} className="w-[36rem]" />
      </div>
      <div className="w-1/2 flex gap-2 item-center justify-center">
      {productImg.map((img, index) => {
        return (
          <Image 
          src={img} 
          alt="hero image" 
          className="cursor-pointer w-28 " 
          onClick={() => setMainImg(productImg[index])}
          />
        );
      })}
        
      </div>
    </div>
  );
};

export default ProductPhotos;
