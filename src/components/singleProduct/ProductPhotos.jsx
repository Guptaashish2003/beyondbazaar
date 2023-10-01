"use client";
import Image from "next/image";
import img1 from "@/assets/img1.png";
import img2 from "@/assets/img2.png";
import img3 from "@/assets/img3.png";
import img4 from "@/assets/img4.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import {setSelectedThumbnail} from '../../app/action/index'

const ProductPhotos = () => {
  const productImg = [img1, img2, img3, img4];
  const selectedThumbnail = useSelector((state) => state.changeImg);
  const dispatch = useDispatch();

  return (
    <div className="p-4 mt-4 w-1/2">
      <div className=" flex items-center justify-center">
        <Image
          src={productImg[selectedThumbnail.selectedThumbnail]}
          alt="Product main image"
          className="w-[80%] h-[80%]  cursor-pointer mx-auto sm:w-96 sm:h-auto lg:w-[90rem] "
        />
      </div>
      <div className="w-1/2 flex gap-4 items-center justify-center">
        {productImg.map((img, index) => (
          <div
          key={index}
            onClick={() => dispatch(setSelectedThumbnail(index))}
            className={`cursor-pointer w-28 ml-4  sm:w-36 hover:scale-125 transition duration-500 mt-4 mx-auto max-w-[1090px] block ${index === selectedThumbnail ? 'border-2   border-gray-900' : ''
            }`}
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
