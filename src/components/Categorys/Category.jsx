
"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image'
import category1 from "@/assets/category1.png"
function Category() {
    const category = [1,2,3,4,5,6,7,8,9,10,11,12]

  return (
    <div className="flex flex-col justify-center items-center text-center  ">
      <h1 className="p-8 text-5xl font-bold uppercase">
        Select Your Category{" "}
      </h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="w-full flex mx-auto p-4 "
      >
        {category.map((cate, index) => (
          <SwiperSlide  key={index}>
            <div className="category-card m-3 mx-auto h-72 w-60 max-lg:w-56 max-lg:h-56 flex flex-col items-center justify-evenly">
              <Image
                src={category1}
                className="w-56 h-56 max-lg:w-48 max-lg:h-48  object-cover  rounded-full"
                alt="Category image"
              />
              <div className="ct-title">Mobile</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Category
