import React from 'react'
import img1 from '@/assets/img1.png'
import Image from 'next/image';


const MainProductPage = () => {
  console.log(process.env.NAME)
  return (
    <>
    <div>
      <Image
      src={img1}
      className='w-52'
      />
    </div>


    </>
  )
}

export default MainProductPage