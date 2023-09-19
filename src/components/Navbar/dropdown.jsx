"use client"
import React, { useRef } from 'react'

function dropdown() {
  const itemRef = useRef()
  const showItem = () => {
    // const showDropdown = document.querySelector('.show-dropdown')
    // toggleItem(itemRef.current)

    // // 8. Remove the show-dropdown class from other items
    // if(showDropdown && showDropdown!== itemRef.current){
    //     toggleItem(showDropdown)
    // }
    
  }

//   const toggleItem = (item) =>{
//     const dropdownContainer = item.querySelector('.dropdown__container')

//     // 6. If the same item contains the show-dropdown class, remove
//     if(item.classList.contains('show-dropdown')){
//         dropdownContainer.removeAttribute('style')
//         item.classList.remove('show-dropdown')
//     } else{
//         // 4. Add the maximum height to the dropdown content and add the show-dropdown class
//         dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
//         item.classList.add('show-dropdown')
//     }
// }

  return (
    <li className="dropdown__item" ref={itemRef}>
    <div className="nav__link dropdown__button" onClick={showItem}>
      Resources <i className="ri-arrow-down-s-line dropdown__arrow" />
    </div>
    <div className="dropdown__container">
      <div className="dropdown__content">
        <div className="dropdown__group">
          <div className="dropdown__icon">
            <i className="ri-code-line" />
          </div>
          <span className="dropdown__title" >new templates</span>
          <ul className="dropdown__list">
            <li>
              <a href="#" className="dropdown__link">
                Free templates
              </a>
            </li>
            <li>
              <a href="#" className="dropdown__link">
                Premium templates
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown__group">
          <div className="dropdown__icon">
            <i className="ri-pen-nib-line" />
          </div>
          <span className="dropdown__title">Designs</span>
          <ul className="dropdown__list">
            <li>
              <a href="#" className="dropdown__link">
                Web designs
              </a>
            </li>
            <li>
              <a href="#" className="dropdown__link">
                App designs
              </a>
            </li>
            <li>
              <a href="#" className="dropdown__link">
                Component design
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown__group">
          <div className="dropdown__icon">
            <i className="ri-apps-2-line" />
          </div>
          <span className="dropdown__title">Others</span>
          <ul className="dropdown__list">
            <li>
              <a href="#" className="dropdown__link">
                Recent blogs
              </a>
            </li>
            <li>
              <a href="#" className="dropdown__link">
                Tutorial videos
              </a>
            </li>
            <li>
              <a href="#" className="dropdown__link">
                Webinar
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </li>

  )
}

export default dropdown
