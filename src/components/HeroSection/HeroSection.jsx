
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useGetData } from "@/redux/api/useGetData";
import { useRouter } from "next/navigation";

function HeroSection({ sliderHieght, className, ...props }) {
  const [sliderImage, setSliderImage] = useState([]);
  const Router = useRouter();
  const getSlider = async () => {
    const hero = await useGetData("/api/heroslides");
    const slide = hero.data.map((itm) => itm.heroImage);
    setSliderImage(slide);
  };
  useEffect(() => {
    getSlider();
  }, []);

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
        {sliderImage.map((img, index) => (
          <SwiperSlide onDoubleClick={() => {Router.push("/single-product/esportic-built-in-21000-classic-games-wireless-console-game-stick-video-game-console-9-bit-mini-retro-controller-hdmi-output-dual-player-4k-ultra-hd-game-stick-perfect-gift-for-kids-adults")}} key={index} className={`w-full  ${sliderHieght}`}>
            <Image
              src={img}
              width={600}
              priority
              height={600}
              style={{ objectFit: "cover" }}
              alt="hero image"
              className={`w-full cursor-pointer  ${sliderHieght}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default HeroSection;
