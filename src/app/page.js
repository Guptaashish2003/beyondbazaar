import Category from '@/components/Categorys/Category'
import Herosection from '@/components/HeroSection/HeroSection'
import Productcard from '@/components/ProductCards/Productcard'
import FeatureCard from '@/components/featureCard/FeatureCard'
import miilogo from '@/assets/miilogo.png'
import { GiScooter } from "react-icons/gi";
import { BsClockHistory } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";
import Image from 'next/image'
import Clothingcard from '@/components/ProductCards/Clothingcard'
import productImg from "@/assets/proImg1.jpg"
import productImgHover from "@/assets/proImg1Hover.jpg"
export default function Home() {
  return (
    <>
    <Herosection/>
    <Category/>
    <h2 className='p-8 text-5xl font-bold uppercase text-center'>Select Your Category</h2>
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
    <section className='flex justify-evenly flex-wrap sm:w-full  xl:flex-nowrap'>
      <FeatureCard title={'made in india'} description={"E-commerce in India thrives with a diverse array of 'Made in India' products, embracing local production for online consumers."}>
        <Image src={miilogo} className='w-full h-full text-black object-contain'/>
      </FeatureCard>

      <FeatureCard title={'Fast Delivery'} description={'Orders to metro cities reach in 5-7 working days'}>
        <GiScooter className='w-full h-full text-black' />
      </FeatureCard>
      <FeatureCard title={'Value-driven'} description={'We provide unbeatable value with affordable, top-quality products.'}>
        <TbPigMoney className='w-full h-full text-black' />
      </FeatureCard>


    </section>
    </>
  )
}
