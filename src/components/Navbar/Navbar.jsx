"use client"
import React, { useRef,useState,useEffect } from 'react'
import Image from 'next/image'
import logo from "@/assets/logo.jpg"
import Dropdown from './dropdown'
import { BiMenu,BiX,BiSolidCart,BiSolidUser,BiSolidSearch } from "react-icons/bi";
import {AiFillCloseCircle } from "react-icons/ai";
import Link from 'next/link'
import InputBtn from '../Form/InputBtn'

function Navbar() {
  const [show, setShow] = useState("translate-y-0");
  const [hide, setHide] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY ) {
            setShow("-translate-y-[120px]");
        } else {
            setShow("shadow-sm");
        }
    } else {
        setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
};

useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
        window.removeEventListener("scroll", controlNavbar);
    };
}, [lastScrollY,hide]);

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
    <>
<header className={`header fixed top-0 left-0 w-full flex justify-evenly ${show}`}>
  <nav className="nav w-full p-2 ">
  <div className="nav__data   flex justify-between items-center w-full h-2/3">
        <div className="logo h-full">
                <Image
            src={logo}
            className='w-full h-full object-contain'
            alt="logo"
            /> 
        </div>
    <div className="lsc flex justify-center items-center p-4 gap-2 ">
      <div className={`absolute right-0 left-0 mx-auto w-1/3 flex justify-center max-md:w-1/2 max-lg:w-1/2 max-sm:w-5/6 ` }>
      {hide?<div className='bg-blor'></div>:""}
            <div className={`input-box z-10 ${hide?"mobile-search open !ml-0 !mt-5 !mb-2 ":""}`}  >
              <InputBtn type="text" placeholder="Search..." className='relative p-4 outline-none border-none h-4/5 w-full  rounded-md text-xl font-bold bg-white border  border-gray-200 focus:border-gray-400 '/>
              <span className="absolute h-[90%] top-0 left-0 w-16 rounded-md flex justify-center bg-white">
                <BiSolidSearch className="cursor-pointer search-icon" onClick={()=>{setHide(true)}}/>
              </span>
              <AiFillCloseCircle className={`cursor-pointer close-icon !text-5xl mobile-search`} onClick={()=>{setHide(false)}}/>
            </div>
      </div>

      <div className='w-8 h-8 bg-[--first-color] text-white rounded-full flex justify-center items-center hidden-nav-icon'>
        <BiSolidCart className='w-[75%] h-[75%] text-inherit cursor-pointer '/>
      </div>
      <div className='w-8 h-8 bg-[--first-color] text-white rounded-full flex justify-center items-center hidden-nav-icon'>
        <BiSolidUser className='w-[75%] h-[75%] text-inherit cursor-pointer '/>
      </div>
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
         
          <Link href="/" className="nav__link">
            Home
          </Link>
        </li>
        {/*=============== DROPDOWNs ===============*/}
       { dropdownItems.map((item,index)=><Dropdown key={index}  title={item.title} dropLink={item.dropLink}/>)}

      </ul>
    </div>

  </nav>
</header>
    </>


  )
}

export default Navbar




