"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import logo from "@/assets/logo.png"
import Dropdown from './dropdown'
import { BiMenu,BiX,BiSolidCart,BiSearchAlt,BiSolidUser } from "react-icons/bi";
import SearchBar from './SearchBar'

function Navbar() {
  const dropdownItems = [
    {
      title:"Technical",
      dropLink:  [{title:"mobile",icon:"webdev",links:[{name:"pro player",url:"webdev"},{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"}]},{title:"computer",icon:"webdev",links:[{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"}]},{title:"smart watch",icon:"webdev",links:[{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"}]}],
      
    },
    {
      title:"Gaming",
      dropLink:  [{title:"pro player",icon:"webdev",links:[{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"}]},{title:"webdev",icon:"webdev",links:[{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"}]},{title:"webdev",icon:"webdev",links:[{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"}]}],

    },
  ];

  const navToggleRef = useRef()
  const navMenuRef = useRef()
  const showMenu = () => {
    navMenuRef.current.classList.toggle('show-menu')
    navToggleRef.current.classList.toggle('show-icon')
  }

  return (
<header className="header fixed top-0 left-0 w-full flex justify-evenly">
  <nav className="nav container ">
  <div className="nav__data   flex justify-between items-center w-full h-2/3">
    <div className="lsc flex justify-center items-center p-4  ">
        <BiSearchAlt className='w-8 h-8 mx-2 text-color cursor-pointer'/>
        {/* <BiSolidCart className='w-8 h-8 mx-2 text-color cursor-pointer '/>
        <BiSolidUser className='w-8 h-8 mx-2 text-color cursor-pointer'/> */}
    </div>
        <div className="logo h-full">
                <Image
            src={logo}
            className='w-full h-full'
            alt="logo"
            /> 
        </div>

    <div className="nav__toggle"  onClick={showMenu} ref={navToggleRef}>
      <BiMenu className="nav__toggle-menu w-full h-full"/>
      <BiX className='nav__toggle-close w-full h-full'/>
    </div>
        
    </div>
    {/*=============== NAV MENU ===============*/}
    <div className="nav__menu " id="nav-menu" ref={navMenuRef}>
      <ul className="nav__list">
        <li>
          <a href="#" className="nav__link">
            Home
          </a>
        </li>
        {/*=============== DROPDOWNs ===============*/}
       { dropdownItems.map((item,index)=><Dropdown key={index}  title={item.title} dropLink={item.dropLink}/>)}

      </ul>
    </div>

  </nav>
</header>


  )
}

export default Navbar




