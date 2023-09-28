import React from 'react'
import ProductPhotos from './ProductPhotos'
import ProductDes from './ProductDes'

const ProductPage = () => {
  return (
    <div className='flex justify-center text-center  '>
        <ProductPhotos/>
        <section className='w-[50%] mt-24 relative right-32'>
          
            <ProductDes title={"Samsung curved display"} para={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima inventore quidem temporibus maiores cum id quo soluta quas doloribus! Vero quo quod labore."}/>
        </section>


    </div>
  )
}

export default ProductPage