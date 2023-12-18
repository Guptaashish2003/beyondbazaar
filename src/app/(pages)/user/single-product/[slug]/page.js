
import ProductDes from '@/components/singleProduct/ProductDes'
import ProductDetails from '@/components/singleProduct/ProductDetails'
import ProductPhotos from '@/components/singleProduct/ProductPhotos'
import ProductReview from '@/components/singleProduct/ProductReview'
import { useGetData } from '@/redux/api/useGetData'
import {notFound} from "next/navigation"
import React from 'react'

const page = async ({ params }) => {
  // notFound()
  const { slug } = params;
  const {data,success} = await useGetData( `product/single-product/${slug}`)
  if (!data) {
    return notFound();
  }

  return (
    <>
    <div className="flex  justify-center flex-wrap  p-4 lg:mt-[--nav-spc] mt-12">
      <ProductPhotos img={data.productImage}/>
      <ProductDes className="h-96" id={data._id} slug={data.slug} title={data.productName} discription={data.productDescription} price={data.productPrice} stock={data.productQuantity}/>
    </div>
      <ProductDetails />
      <ProductReview className="mt-4"/>
      
  </>
  )
}

export default page