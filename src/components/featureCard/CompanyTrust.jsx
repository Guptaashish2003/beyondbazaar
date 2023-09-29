import React from 'react'
import FeatureCard from './FeatureCard'
import miilogo from '../../assets/miilogo.png'
import { FaTruckFast } from 'react-icons/fa6'
import { TbPigMoney } from 'react-icons/tb'
import Image from 'next/image'


const CompanyTrust = () => {
  return (
    <section className='flex justify-evenly items-center  flex-wrap sm:w-full  xl:flex-nowrap'>
      <FeatureCard title={'made in india'} description={"E-commerce in India thrives with a diverse array of 'Made in India' products, embracing local production for online consumers."}>
        <Image src={miilogo} className='w-full h-full text-black object-contain'/>
      </FeatureCard>

      <FeatureCard title={'Fast Delivery'} description={'Orders to metro cities reach in 5-7 working days'}>
        <FaTruckFast className='w-full h-full text-black' />
      </FeatureCard>
      <FeatureCard title={'Value-driven'} description={'We provide unbeatable value with affordable, top-quality products.'}>
        <TbPigMoney className='w-full h-full text-black' />
      </FeatureCard>
    </section>
  )
}

export default CompanyTrust