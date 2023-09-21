import React from 'react'
import Image from 'next/image'
import category1 from "@/assets/category1.png"
function Category() {
    const category = [1,2,3,4,5,6,7,8,9,10,11,12]
  return (
    <div className='flex flex-col justify-center items-center text-center overflow-hidden '>
        <h1 className='p-8 text-5xl font-bold uppercase'>Select Your Category</h1>
        <div className='w-full flex overflow-x-scroll cursor-grab'>
           { category.map((cate,index)=><div key={index}>
                <div className="category-card m-3 h-72 w-60 flex flex-col items-center justify-evenly" >
                    <Image
                    src={category1}
                    className='w-56 h-56 object-cover  rounded-full'
                    alt="Category image"
                    />
                <div className="ct-title">
                    Mobile
                </div>
                </div>
            </div>)}
            
        </div>
      
    </div>
  )
}

export default Category
