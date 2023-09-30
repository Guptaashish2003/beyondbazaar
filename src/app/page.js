import Category from '@/components/Categorys/Category'
import Herosection from '@/components/HeroSection/HeroSection'
import Productcard from '@/components/ProductCards/Productcard'
import Clothingcard from '@/components/ProductCards/Clothingcard'
import productImg from "@/assets/proImg1.jpg"
import productImgHover from "@/assets/proImg1Hover.jpg"
export default function Home() {
  return (
    <>
    <Herosection/>
    <Category/>
    <h2 className='p-8 text-5xl max-md:text-3xl font-bold uppercase text-center'>Select Your Category</h2>
    <div className='flex flex-wrap justify-evenly'>
      <Clothingcard animation={true} img={productImg} hover={productImgHover}/>
      <Productcard/>
      <Productcard border={"black"}/>
      <Productcard animation={true}/>
      <Productcard animation={true}/>
      <Productcard  discount={600} />
      <Productcard discount={600} bgColor={"#e2e1e6"}/>
      <Productcard />
      <Productcard addToCart={true}/>
    </div>
    
      {/* <ProductPage/> */}
    </>
  )
}
