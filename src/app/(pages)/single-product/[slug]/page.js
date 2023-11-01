
import ProductDes from '@/components/singleProduct/ProductDes'
import ProductDetails from '@/components/singleProduct/ProductDetails'
import ProductPhotos from '@/components/singleProduct/ProductPhotos'
import ProductReview from '@/components/singleProduct/ProductReview'
import { useGetData } from '@/redux/api/useGetData'
import React from 'react'
import {notFound} from "next/navigation"

const page = async ({ params }) => {
  const { slug } = params;
  const {data} = await useGetData( `product/single-product/${slug}`)
  return (
    <>
    <div className="flex  justify-center flex-wrap  p-4">
      <ProductPhotos img={data.productImage}/>
      <ProductDes className="h-96" title={data.productName} discription={data.productDescription} price={data.productPrice}/>
    </div>
      <ProductDetails />
      <ProductReview />

  </>
  )
}

export default page