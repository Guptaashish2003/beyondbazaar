"use client"
import Image from 'next/image';
import React, { useRef } from 'react'
import { BiDownArrowAlt,BiSolidHeartCircle } from "react-icons/bi";
function dropdown({title,dropLink}) {
  const itemRef = useRef()
  const showItem = () => {
    const showDropdown = document.querySelector('.show-dropdown')
    toggleItem(itemRef.current)

    // 8. Remove the show-dropdown class from other items
    if(showDropdown && showDropdown!== itemRef.current){
        toggleItem(showDropdown)
    }
    
  }

  const toggleItem = (item) =>{
    const dropdownContainer = item.querySelector('.dropdown__container')

    // 6. If the same item contains the show-dropdown class, remove
    if(item.classList.contains('show-dropdown')){
        dropdownContainer.removeAttribute('style')
        item.classList.remove('show-dropdown')
    } else{
        // 4. Add the maximum height to the dropdown content and add the show-dropdown class
        dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
        item.classList.add('show-dropdown')
    }
}

  return (
    <li className="dropdown__item" ref={itemRef}>
    <div className="nav__link dropdown__button" onClick={showItem}>
      {title} <BiDownArrowAlt className='text-color'/>
    </div>
    <div className="dropdown__container">
      <div className="dropdown__content">

       {dropLink.map((items,index)=><div key={index} className="dropdown__group">
          <div className="dropdown__icon">
          <Image
          src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="category"
          width={30}
          height={30}
          className='rounded-full'
           style={{width:"50px", height:"50px"}} 
           />
          </div>
          <span className="dropdown__title">{items.title}</span>
          <ul className="dropdown__list">
        {items.links.map((link,index)=><li key={index}>
              <a  href={link.url} className="dropdown__link">
                {link.name}
              </a>
            </li>)}
          </ul>
        </div>)}
      </div>
    </div>
  </li>

  )
}

export default dropdown
