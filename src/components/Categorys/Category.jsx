
"use client"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image'
import category1 from "@/assets/category1.png"
import axios from 'axios';
import { errorTostHandler } from '@/redux/api/errorTostHandler';
function Category() {
    const [category,setCategory] = useState([])
  
    useEffect(() => {
      try {
        const getCategory = async()=>{
          const res = await axios.get("/api/category/all-category")
          // console.log(res?.data?.data);
          setCategory(res?.data?.data);
        }
        getCategory()
      } catch (error) {
        // console.log(error);
        errorTostHandler(error)

      }
    }, []);

  return (
    <div className="flex flex-col aspect-[188:33] justify-center items-center text-center px-6 py-2">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 3,
          },
          "@0.75": {
            slidesPerView: 4,
          },
          "@1.00": {
            slidesPerView: 4,
          },
          "@1.50": {
            slidesPerView: 8,
          },
        }}
        modules={[Pagination]}
        className="w-full flex mx-auto p-4 "
      >
        {category.map((cate, index) => (
          <SwiperSlide  key={index} className='py-10 gap-x-3'>
            <div className="category-card m-3 mx-auto h-[91%] w-11/12 max-lg:w-56 max-lg:h-56 flex flex-col items-center cursor-pointer aspect-square justify-evenly">
              <Image
                src={cate.categoryImage[0] ? cate.categoryImage[0] : category1}
                className="w-24 h-24 max-lg:w-48 max-lg:h-48 max-md:w-36 max-md:h-36  object-cover  rounded-full"
                alt="Category image"
                width={300}
                height={300}
              />
              <p className="ct-title">{cate.categoryName}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Category
