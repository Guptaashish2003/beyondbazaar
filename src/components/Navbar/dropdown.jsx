"use client"
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

       {dropLink.map((items)=><div className="dropdown__group">
          <div className="dropdown__icon">
          <BiSolidHeartCircle style={{width:"50px", height:"50px"}}/>
          </div>
          <span className="dropdown__title">{items.title}</span>
          <ul className="dropdown__list">
        {items.links.map((link)=><li>
              <a href={link.url} className="dropdown__link">
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
