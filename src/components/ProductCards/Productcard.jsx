
"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import productImg from "@/assets/productImag1.jpg"
function Productcard({img,title,price,slug,bgColor, addToCart,discount,animation,border}) {
  const [line, setLine] = useState(false)
  const [imgBlack, setImgBlack] = useState(false)
  const router = useRouter()
  const addAnimation = () => {
    if (animation) {
      setLine(true)
      setImgBlack(true)   
    }
  }
  const removeAnimation = () => {
    if(animation) {
    setLine(false)
    setImgBlack(false)
    }
  }
  const moveSingle = () => {
    router.push(`/user/single-product/${slug}`)
  }
  return (
    <>
     <div style={{border:`2px solid ${border}`}} className='w-5/12 lg:w-1/4 sm:w-2/5 md:w-1/3 xl:w-1/5 flex flex-col items-center justify-center p-2 m-2 cursor-pointer' onMouseEnter={addAnimation} onMouseLeave={removeAnimation}>
      <div className='w-full flex  flex-col items-center justify-center' onClick={moveSingle}>
      <div className='flex justify-center items-center relative' style={{backgroundColor:`${bgColor}`}}>
        {imgBlack?<div className='w-full h-full absolute flex justify-center items-center text-white' style={{backgroundColor:"#0b0b0b8c"}}>See More Details...</div>:""}
        <div className='w-[90%] h-[90%]'>
        <Image
          src={img || productImg}
          alt="Product image"
          height={'500'}
          width={'600'}
          className='w-full h-full object-contain'
        />
          
        </div>
      </div>
      <div className='flex flex-wrap p-3 justify-between w-full text-lg font-bold'>
        <div className={`line-animate card-title max-md:text-sm  overflow-hidden text-ellipsis whitespace-nowrap ${line?"line-animated":""} ${discount?"w-full":"w-1/2"}`} >
        {title || "Men's Footwear - Buy Men's Shoes Starts"}
        </div>
        <div className={`card-price  ${discount?"flex justify-between w-full":""}`}>
          <p>₹{price|| 500}</p>
          {discount?<del className='text-slate-400'>₹{discount}</del>:""}
        </div>
      </div>
      </div>
      {addToCart?<div className='border-2 border-black border-solid flex justify-center items-center font-bold text-lg w-full h-12 hover:bg-black hover:text-white'>
        Add To Cart
      </div>:""}
      </div> 
    </>
  )
}

export default Productcard
