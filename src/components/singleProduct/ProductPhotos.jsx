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
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const handleThumbnailClick = (img, index) => {
    setMainImg(img);
    setSelectedThumbnail(index);
  };

  return (
    <div className="p-8  w-1/2 max-lg:w-full">
      <div className=" flex items-center justify-center">
        <Image
          src={mainImg}
          alt="Product main image"
          className="w-11/12 h-[90%]  cursor-pointer mx-auto sm:w-96 sm:h-auto lg:w-[90rem] "
        />
      </div>
      <div className="w-full min-h-[7rem] flex gap-8 items-center justify-center">
        {productImg.map((img, index) => (
          <div
            key={index}
            className={`cursor-pointer h-full w-1/6 hover:scale-125 transition duration-500 ${
              selectedThumbnail === index ? 'border-2   border-gray-900' : ''
            }`}
            onClick={() => handleThumbnailClick(img, index)}
          >
            <Image
              src={img}
              alt="Product thumbnail"
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};


export default ProductPhotos;
