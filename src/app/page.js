import Category from '@/components/Category/Category'
import Herosection from '@/components/HeroSection/HeroSection'
import Productcard from '@/components/ProductCards/Productcard'


export default function Home() {
  return (
    <>
    <Herosection/>
    <Category/>
    <h1 className='p-8 text-5xl font-bold uppercase text-center'>Select Your Category</h1>
    <div className='flex flex-wrap justify-center'>
    <Productcard/>
    <Productcard border={"black"}/>
    <Productcard animation={true}/>
    <Productcard animation={true}/>
    <Productcard  discount={600} />
    <Productcard discount={600} bgColor={"#e2e1e6"}/>
    <Productcard addToCart={true}/>
    <Productcard addToCart={true}/>
    </div>
    </>
  )
}
