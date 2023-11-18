import React from 'react'
import YourAccSetting from '@/components/ProfileSetting/YourAccSetting'
import logo from "@/assets/logo.png"
import { FaShoppingBasket } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";


const page = () => {
  return (
    <div className='mt-40 flex w-11/12 md:max-lg:justify-center max-sm:justify-center flex-row gap-10 max-sm:gap-4 mx-auto my-4 flex-wrap justify-start'>
        <YourAccSetting img={<FaShoppingBasket className='w-full h-full object-cover' />} title={"Your Orders"} description={"Track Orders, Buy again "} />
        <YourAccSetting img={<MdOutlineSecurity className='w-full h-full object-cover'/>} title={"Login & Security"}  description={"Edit login,name ,mobile number, email "} />
      <YourAccSetting img={<FaLocationDot className='w-full h-full object-cover' />} title={"Your Adresses"} description={"Edit your address for your gifts and orders  "} />
        <YourAccSetting img={<FaRegCreditCard className='w-full h-full object-cover'/>} title={"Payment Options"}  description={"edit or add your payment options "} />
        <YourAccSetting img={<MdSupportAgent className='w-full h-full object-cover'/>} title={"Help & Support"}  description={"Contact us, and we'll be happy to assist you, just like family."} />
        <YourAccSetting img={<PiSignOutBold className='w-full h-full object-cover'/>} title={"Log Out"}  description={"Thank  you for visiting. I can't wait to meet you again."} />

    </div>
  )
}

export default page