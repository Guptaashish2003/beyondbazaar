
"use client"
import React, { useState } from 'react'
import Image from 'next/image'

function Clothingcard({img,hover,title,price, addToCart,animation}) {
  const [line, setLine] = useState(false)
  const [imgBlack, setImgBlack] = useState(false)
  const [imgs, setImgs] = useState(img)
  const addAnimation = () => {
    if (animation) {
      setLine(true)
      setImgBlack(true)
      setImgs(hover)   
    }
  }
  const removeAnimation = () => {
    if(animation) {
    setLine(false)
    setImgBlack(false)
    setImgs(img) 
    }
  }
  
  return (
    <>
     <div  className='w-5/12 lg:w-1/4 sm:w-2/5 md:w-1/3 xl:w-1/5 flex flex-col items-center justify-center p-2 m-2 cursor-pointer ' >
      <div className='w-full flex  flex-col items-center justify-center' >
      <div className='flex justify-center items-center relative' onMouseEnter={addAnimation} onMouseLeave={removeAnimation}>
        {imgBlack?<div className='w-full h-full absolute flex justify-center items-end p-4' ><button className='btn-up rounded-md bg-white w-full h-16 font-bold text-lg'>Add To Cart</button></div>:""}
        <Image
          src={imgs}
          alt="Product image"
          className=' w-full h-full object-contain rounded-lg'
        />
      </div>
      <div className='flex flex-wrap p-3 justify-between w-full text-lg font-bold'>
        <div className={` card-title  overflow-hidden text-ellipsis whitespace-nowrap `} >
        {title || "Men's Footwear - Buy Men's Shoes Starts w-full"}
        </div>
        <div className={`card-price  w-full text-center`}>
          <p>₹{price|| 500}</p>
        </div>
      </div>
      </div>
      </div> 
    </>
  )
}

export default Clothingcard
