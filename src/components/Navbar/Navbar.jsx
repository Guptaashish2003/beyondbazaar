"use client"
import React from 'react'
import Image from 'next/image'
import logo from "@/assets/logo.png"
import DropdownNav from './dropdown'
function Navbar() {
  return (
    <nav className='bg-black py-3 px-8 flex justify-between text-white items-center' >
        <div className="logo">
                <Image
            src={logo}
            width={80}
            height={80}
            alt="logo"
            /> 
        </div>
        <div className="dropDown">
        <DropdownNav/>

        </div>
        <div className="lsc">hi</div>
    </nav>
  )
}

export default Navbar




