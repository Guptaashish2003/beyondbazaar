"use client"
import React, { useEffect, useRef, useState } from 'react'
import InputBtn from '../Form/InputBtn'
import {AiFillCloseCircle } from "react-icons/ai";
import { BiSolidSearch } from "react-icons/bi";
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { useGetData } from '@/redux/api/useGetData';
function SearchBar({options}) {
  const inputRef = useRef()
  const [searchText,setSearchText] = useState("")
  const searchParams = useSearchParams()
  const [suggest, setSuggest] = useState([])
  const router = useRouter()
  const [keywords] = useDebounce(searchText,500)
  const [selected, setSelected] = useState(-1);
  const [hide, setHide] = useState(false);
  const onTextChange = (e) => {
    setSearchText(e.target.value)
    if(e.target.value === ''){
      setSuggest([])
    }
  }
  const clear = () => {
    // inputRef.current.value = '';
    setSearchText("")
    setSuggest([])
    setSelected(-1)
    // setHide(false)
  }
    const onSearch = () => {
      if (hide) {
        if (inputRef.current.value !== "") {
          let query = inputRef.current.value.replaceAll(' ', '+');
          clear()
          router.push(`/category-filters?keyword=${query}`)
          }
      }
    }
    useEffect(()=>{
      if(keywords) suggestion()
    },[keywords])
    const suggestion = async ()=>{
      let query = keywords.replaceAll(' ', '+');                 
      const res = await useGetData(`/api/product/all-product?fields=productTags&keyword=${query}`)
      let result = [];
      if(res.success){
        res?.data?.filter(product =>{
           product.productTags.filter(tag =>{
            if(tag.toLowerCase().includes(keywords.toLowerCase())){
              if(result.length < 10)
              result.push(tag);
            }
          })
        })
      }
      setSuggest(result);
    }
    const keyboardSearch = (e) => {
      if(suggest.length > 0 && e.key === ' '){
        setSearchText(suggest[selected])  
      }
  
      if (e.key === 'ArrowDown' && selected < suggest.length - 1) {
          setSelected(selected + 1);
          e.target.value = suggest[selected+1] 
      }
      if (e.key === 'ArrowUp' && selected > 0) {
          setSelected(selected - 1);
          e.target.value = suggest[selected-1]
      }
      if (e.key === 'Enter' && searchText !== "") {
        onSearch()
      }
    }
  return (
    <div className={`absolute right-0 left-0 mx-auto w-1/3 flex justify-center max-md:w-1/2 max-lg:w-1/2 max-sm:w-5/6 ` }>
    {hide?<div className='bg-blor'></div>:""}
          <div className={`input-box z-10 ${hide?"mobile-search open !ml-0 !mt-5 !mb-2 ":""}`}  >
            <InputBtn ref={inputRef} name='search' onChange={onTextChange} onKeyDown={keyboardSearch} type="text" placeholder="Search..." className='relative p-4 outline-none border-none h-4/5 w-full  rounded-md text-xl font-bold  border  border-gray-200 focus:border-gray-400 !bg-transparent'/>
            <span className="absolute h-[90%] top-0 right-0 w-16 rounded-md flex justify-center bg-white">
              <BiSolidSearch className="cursor-pointer search-icon" onClick={()=>{setHide(true);onSearch()}}/>
            </span>
            <AiFillCloseCircle className={`cursor-pointer close-icon !text-5xl mobile-search`} onClick={()=>{setHide(false)}}/>
          </div>
          {suggest.length >= 0?<div className='bg-[#333] absolute left-0 right-0 top-20 z-20 text-white mx-auto'>
          {suggest.map((item,index)=>{
            return <div onClick={()=>{
              let query = item.replaceAll(' ', '+');
              router.push(`/category-filters?keyword=${query}`)
              
              clear()
            }} className={`p-2 cursor-pointer  border-black border-solid hover:bg-white hover:border-y-2 hover:text-[#333]  ${index===selected?"bg-white border-y-2 text-[#333]":""}`} key={index}>{item}</div>
          })}
          </div>:""}
    </div>
  )
}

export default SearchBar
