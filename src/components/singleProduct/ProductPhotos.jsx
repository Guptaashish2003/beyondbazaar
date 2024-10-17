"use client";
import Image from "next/image";
import { useState,useEffect } from "react";
import { TbZoomPan } from 'react-icons/tb';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/grid';
// import required modules
import { FreeMode, Navigation, Thumbs,Pagination,Grid } from 'swiper/modules';

const ProductPhotos = ({img}) => {
  // const img = [img1, img2, img3, img4, img1, img2, img3];
  const [selectedThumbnail, setSelectedThumbnail] = useState(img[0])
  const [screenWidth, setScreenWidth] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showFullScreen, setShowFullScreen] = useState(false);


  const openFullScreen = () => {
    setShowFullScreen(!showFullScreen);
    
  };


useEffect(() => {
  const width = window.innerWidth;
    window.addEventListener('resize', ()=>setScreenWidth(width>= 1024))
    if (width>= 1024) {
      
      setScreenWidth(true)
    } else {
      setScreenWidth(false)
      
    }

}, [screenWidth]);


// console.log(screenWidth)
  return (
    <div className={showFullScreen?"fixed top-0 right-0 w-screen h-screen flex bg-white z-[1000]":"flex w-1/2 max-lg:w-full flex-col gap-y-2 "}>
      <div className={`mx-auto relative ${showFullScreen?"w-3/4 max-sm:w-full bottom-2 ":"w-11/12"}` }>
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
          {img.map((img, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center p-2 "
            >
              <Image
                src={img}
                onClick={() => openFullScreen(img)}
                alt="Product thumbnail"
                height={'500'}
                width={'600'}
                className="w-full cursor-pointer h-full rounded-lg object-contain"
              />
            </SwiperSlide>
          ))}
    
        </Swiper>
        <div className={`w-16 h-16    max-lg:w-8 max-lg:h-8 absolute right-6 ${showFullScreen?"top-6":`bottom-6`}  z-10 bg-[#333] flex justify-center items-center text-white rounded-full cursor-pointer`} onClick={openFullScreen}>
          {showFullScreen?<AiFillCloseCircle className="w-[90%] h-[90%] max-sm:w-16 max-sm:h-16"/>:<TbZoomPan className="w-[90%] h-[90%]" />}
        </div>
      </div>
      {/* pc optins  */}
      {screenWidth && <div className={`max-lg:hidden ${showFullScreen?"w-3/12 h-full flex border-2 ":" h-32"}`}>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        grid={showFullScreen?{
          rows:img.length
        }:false}
        spaceBetween={10}
        slidesPerView={showFullScreen?1:img.length}
        freeMode={false}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs,Grid]}
        className={`mySwiper w-full  my-auto flex gap-7 items-center justify-center ${showFullScreen?" ":"h-32"}  `}
      >
        {img.map((img, index) => (
          <SwiperSlide
            key={index}
            className={`cursor-pointer  ${showFullScreen?"!h-28 !w-3/12":"w-7"}  inline-block rounded-md ${
              selectedThumbnail === img ? 'border-2 border-gray-900' : ''
            }` }
            onClick={()=>{
              // console.log(selectedThumbnail,"selectedThubnail",img,img[index],"selected")
              setSelectedThumbnail(img)
            }}
          >
            <Image
              src={img}
              alt="Product thumbnail"
              height={'500'}
              width={'600'}
              className="w-full h-full rounded-lg object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>}
     
    </div>
  );

};


export default ProductPhotos;
