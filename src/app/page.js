
import Category from '@/components/Categorys/Category'
import Herosection from '@/components/HeroSection/HeroSection'
import Productcard from '@/components/ProductCards/Productcard'
import Clothingcard from '@/components/ProductCards/Clothingcard'
import productImg from "@/assets/proImg1.jpg"
import productImgHover from "@/assets/proImg1Hover.jpg"
import { useGetData } from '@/redux/api/useGetData'
import { notFound } from 'next/navigation'
// import store from './store'

// api call 

export const dynamic = "force-dynamic";

export default async function Home(){
  const { data, success } = await useGetData(`/api/product/all-product`);
  if (!success) {
    return notFound();
  }
  return (
    <>
    <Herosection  className="navMargin " sliderHieght='sliderHieght'/>
    <Category/>
    <h2 className='p-8 text-5xl max-sm:text-3xl  font-bold uppercase text-center'>Select Your Category</h2>
    <div className='flex flex-wrap justify-evenly'>
      {data?.map((data)=><Productcard discount={200} animation={true}  id={data._id}  key={data._id}  img={data?.productImage[0]} hover={data?.productImage[1]} price={data.productPrice} title={data.productName} slug={data.slug}/>)}

      <Clothingcard animation={true} img={productImg} hover={productImgHover}/>
      <Productcard/>
      <Productcard border={"black"} />
      <Productcard animation={true}/>
      <Productcard animation={true}/>
      <Productcard  discount={600} />
      <Productcard discount={600} bgColor={"#e2e1e6"}/>
      <Productcard />
      <Productcard addToCartBtn={true}/>
    </div>
    
      {/* <ProductPage/> */}
    </>
  )
}
