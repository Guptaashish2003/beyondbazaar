"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useGetData } from '@/redux/api/useGetData';
 function HeroSection({sliderHieght,className,...props}) {
  const [sliderImage,setSliderImage] = useState([])
  const getSlider = async () => {
    const hero = await useGetData("/api/heroslides")
     const slide = hero.data.map((itm)=>itm.heroImage);
     setSliderImage(slide)
    
  }
  useEffect(()=>{
    getSlider()
  },[])

  return (
   <>
   <Swiper
       loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className={`${sliderHieght} ${className}`}
      {...props}
          >
      {sliderImage.map((img,index)=><SwiperSlide key={index} className={`w-full  ${sliderHieght}`}>
        <Image
          src={img}
          width={600}
          height={600}
          style={{objectFit: "cover" }}
          alt="hero image"
          className={`w-full cursor-pointer  ${sliderHieght}`}
        />
      </SwiperSlide>)}
      
 
    </Swiper>
   </>
  )
}

export default HeroSection
