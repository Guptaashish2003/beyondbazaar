"use client"
import React, { useState } from 'react'
import InputBtn from '../Form/InputBtn'
import {AiFillCloseCircle } from "react-icons/ai";
import { BiSolidSearch } from "react-icons/bi";
import { useSearchParams } from 'next/navigation'
function SearchBar({options}) {
  const [searchText,setSearchText] = useState("")
  const searchParams = useSearchParams()

    const [hide, setHide] = useState(false);
    const onSearch = () => {
      if (hide) {
        console.log(searchText)
        console.log(searchParams.get('page'));

      }
    }
    
  return (
    <div className={`absolute right-0 left-0 mx-auto w-1/3 flex justify-center max-md:w-1/2 max-lg:w-1/2 max-sm:w-5/6 ` }>
    {hide?<div className='bg-blor'></div>:""}
          <div className={`input-box z-10 ${hide?"mobile-search open !ml-0 !mt-5 !mb-2 ":""}`}  >
            <InputBtn onChange={e=>setSearchText(e.target.value)} type="text" placeholder="Search..." className='relative p-4 outline-none border-none h-4/5 w-full  rounded-md text-xl font-bold bg-white border  border-gray-200 focus:border-gray-400 '/>
            <span className="absolute h-[90%] top-0 left-0 w-16 rounded-md flex justify-center bg-white">
              <BiSolidSearch className="cursor-pointer search-icon" onClick={()=>{setHide(true);onSearch()}}/>
            </span>
            <AiFillCloseCircle className={`cursor-pointer close-icon !text-5xl mobile-search`} onClick={()=>{setHide(false)}}/>
          </div>
    </div>
  )
}

export default SearchBar
