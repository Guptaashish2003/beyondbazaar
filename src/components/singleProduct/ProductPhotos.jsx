"use client";
import Image from "next/image";
import img1 from "@/assets/img1.png";
import img2 from "@/assets/img2.png";
import img3 from "@/assets/img3.png";
import img4 from "@/assets/img4.png";
import { useState,useEffect,useRef } from "react";
import FullScreenImage from "./FullScreenImage";
import { TbZoomPan } from 'react-icons/tb';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
// import required modules
import { FreeMode, Navigation, Thumbs,Pagination } from 'swiper/modules';

const ProductPhotos = () => {
  const productImg = [img1, img2, img3, img4,img1,img4];
  const [selectedThumbnail, setSelectedThumbnail] = useState(productImg[0])
  const [screenWidth, setScreenWidth] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showFullScreen, setShowFullScreen] = useState(false);

  const openFullScreen = (imgSrc) => {
    setShowFullScreen(!showFullScreen);
    console.log(showFullScreen)
  };


useEffect(() => {
  const width = window.innerWidth;
    window.addEventListener('resize', ()=>setScreenWidth(width>= 1024))
    if (width<= 1024) {
      
      setScreenWidth(true)
    } else {
      setScreenWidth(false)
      
    }

}, [screenWidth]);

  return (
    <div className="flex w-1/2 max-lg:w-full flex-col gap-y-2 ">
      <div className={showFullScreen?"absolute top-0 right-0 w-screen h-screen bg-white z-[1000]":` w-11/12 mx-auto relative` }>
        <Swiper
          style={{
            '--swiper-navigation-color': '#333',
            '--swiper-navigation-size': '20px',
            '--swiper-pagination-color': '#333',
          }}
          loop={true}
          navigation={screenWidth}
          pagination={screenWidth}
          thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
          modules={[FreeMode, Navigation, Thumbs,Pagination]}
          className="mySwiper2 w-full h-full"
        >
          {productImg.map((img, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center p-2 "
            >
              <Image
                src={img}
                onClick={() => openFullScreen(img)}
                alt="Product thumbnail"
                className="w-full cursor-pointer h-full rounded-lg object-contain"
              />
            </SwiperSlide>
          ))}
    
        </Swiper>
        <div className={`w-16 h-16 absolute right-6 ${showFullScreen?"top-6":`bottom-6`}  z-10 bg-[#333] flex justify-center items-center text-white rounded-full cursor-pointer`} onClick={openFullScreen}>
          {showFullScreen?<AiFillCloseCircle className="w-[90%] h-[90%]"/>:<TbZoomPan className="w-[90%] h-[90%]"/>}
        </div>
      </div>
      <div className="max-lg:hidden  ">
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper w-full h-32 flex gap-7 items-center justify-center'
      >
        {productImg.map((img, index) => (
          <SwiperSlide
            key={index}
            className={`cursor-pointer w-7 rounded-md ${
              selectedThumbnail === productImg[index] ? 'border-2 border-gray-900' : ''
            }` }
            onClick={()=>setSelectedThumbnail(productImg[index])}
          >
            <Image
              src={img}
              alt="Product thumbnail"
              className="w-full h-full rounded-lg object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      {/* {showFullScreen && (
        <div>

          <FullScreenImage src={fullscreenImageSrc} alt="Product thumbnail" onClose={closeFullScreen} />
          <div className="max-lg:hidden">
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper w-full h-32 flex gap-7 items-center justify-center'
      >
        {productImg.map((img, index) => (
          <SwiperSlide
            key={index}
            className={`cursor-pointer w-7 rounded-md ${
              selectedThumbnail === productImg[index] ? 'border-2 border-gray-900' : ''
            }` }
            onClick={()=>setSelectedThumbnail(productImg[index])}
          >
            <Image
              src={img}
              alt="Product thumbnail"
              className="w-full h-full rounded-lg object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
        </div>
        
      )} */}
    </div>
  );

};


export default ProductPhotos;
