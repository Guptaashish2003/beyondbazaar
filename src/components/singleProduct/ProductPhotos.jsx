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
    <div className="mt-24 relative left-32">
      <div className="w-1/2 flex items-center justify-center">
        <Image
          src={mainImg}
          alt="Product main image"
          className="w-[90rem]  h-[25rem] hover:scale-125 transition duration-500 cursor-pointer mx-auto sm:w-96 sm:h-auto lg:w-[90rem] "
          width={850}
          height={850}
        />
      </div>
      <div className="w-1/2 flex gap-4 items-center justify-center">
        {productImg.map((img, index) => (
          <div
            key={index}
            className={`cursor-pointer w-28 ml-4  sm:w-36 hover:scale-125 transition duration-500 mt-8 mx-auto max-w-[1090px] block ${
              selectedThumbnail === index ? 'border-2   border-gray-900' : ''
            }`}
            onClick={() => handleThumbnailClick(img, index)}
          >
            <Image
              src={img}
              alt="Product thumbnail"
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


export default ProductPhotos;
