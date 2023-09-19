"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import logo from "@/assets/logo.png"
import Dropdown from './dropdown'

function Navbar() {
  const navToggleRef = useRef()
  const navMenuRef = useRef()
  const showMenu = () => {
    navMenuRef.current.classList.toggle('show-menu')
    navToggleRef.current.classList.toggle('show-icon')
  }

  return (
<header className="header bg-black text-white">
  <nav className="nav container">
    <div className="nav__data">
        <div className="logo">
                <Image
            src={logo}
            width={80}
            height={80}
            alt="logo"
            /> 
        </div>
      <div className="nav__toggle"  onClick={showMenu} ref={navToggleRef}>
        <i className="ri-menu-line nav__toggle-menu" />
        <i className="ri-close-line nav__toggle-close" />
      </div>
    </div>
    {/*=============== NAV MENU ===============*/}
    <div className="nav__menu"  ref={navMenuRef}>
      <ul className="nav__list">
        <li>
          <a href="#" className="nav__link">
            home
          </a>
        </li>
        {/*=============== DROPDOWN 1 ===============*/}
          <Dropdown/>
        {/*=============== DROPDOWN 2 ===============*/}
          <Dropdown/>

        {/*=============== DROPDOWN 3 ===============*/}
          <Dropdown/>
      </ul>
    </div>
  </nav>
</header>

  )
}

export default Navbar




