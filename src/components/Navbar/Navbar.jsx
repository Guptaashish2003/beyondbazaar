"use client"
import React, { useRef,useState,useEffect } from 'react'
import Image from 'next/image'
import logo from "@/assets/logo.png"
import Dropdown from './dropdown'
import { BiMenu,BiX,BiSolidCart,BiSolidUser } from "react-icons/bi";
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import SearchBar from '../SearchBar/SearchBar'
import { useSession } from "next-auth/react";
function Navbar() {
  const router = useRouter()
  const session = useSession();
  const [show, setShow] = useState("translate-y-0");

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
    
}, [lastScrollY]);

if (session.status === 'authenticated' && localStorage.getItem("token") !== session.data.token) {
  localStorage.setItem("token",session.data.token)

}

  const dropdownItems = [
    {
      title:"Technical",
      dropLink:  [{title:"mobile",icon:"webdev",links:[{name:"pro player",url:"webdev"},{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"}]},
      {title:"computer",icon:"webdev",links:[{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"}]},{title:"smart watch",icon:"webdev",links:[{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"},{name:"webdev",url:"webdev"}]}],
      
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

  const noLoginUser = () => {
    if(!localStorage.getItem('token')  ){
      toast.warn("Please Login first.......")
    }
  }
  const userProfile = () => {
    if(!localStorage.getItem('token')  ){
      router.push("/login")
    }else{
      router.push("/user/account-setting")
    }
    showMenu()
  }

  

  return (
    <>
    {/* mobile cart  */}
    <Link href="/user/shopping-cart" className='mobileCart ' onClick={noLoginUser}>
      <div className='w-14 h-14 bg-[--first-color] text-white rounded-full flex justify-center items-center'>
        <BiSolidCart className='w-[75%] h-[75%] text-inherit cursor-pointer '/>
      </div>
    </Link>

      {/* nav  */}
<header className={`header fixed top-0 left-0 w-full flex justify-evenly ${show}`}>
  <nav className="nav w-full p-2 ">
  <div className="nav__data   flex justify-between items-center w-full h-2/3">
        <div className="logo h-full overflow-hidden" onClick={()=>router.push("/")}>
                <Image
            src={logo}
            className='w-full object-contain cursor-pointer'
            alt="logo"
            /> 
        </div>
    <div className="lsc flex justify-center items-center p-4 gap-2 ">
     <SearchBar/>
      {/* cart */}
      <Link href="/user/shopping-cart" onClick={noLoginUser}>
        <div className='w-8 h-8 bg-[--first-color] text-white rounded-full flex justify-center items-center hidden-nav-icon'>
          <BiSolidCart className='w-[75%] h-[75%] text-inherit cursor-pointer '/>
        </div>
      </Link>
        {/* user  */}
        <div onClick={userProfile} className='w-8 h-8 bg-[--first-color] text-white rounded-full flex justify-center items-center hidden-nav-icon'>
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
         
          <Link href="/" className="nav__link" onClick={showMenu}>
            Home
          </Link>
        </li>
        {/*=============== DROPDOWNs ===============*/}
       { dropdownItems.map((item,index)=><Dropdown key={index}  title={item.title} dropLink={item.dropLink}/>)}
       <li>
         
        { <span onClick={userProfile} className="nav__link  mobileUser">
           {localStorage.getItem('token') ?"Settings":"Login 😉"}
         </span>}
       </li>
      </ul>
    </div>

  </nav>
</header>
    </>


  )
}

export default Navbar




