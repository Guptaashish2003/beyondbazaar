"use client"
import { Header } from '@/components/Admin';
import Actions from '@/components/Admin/Action'
import SubmitButton from '@/components/Form/SubmitButton';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { TiImage } from "react-icons/ti";
import { usePostDataProtected } from "@/redux/api/usePostData";
import { useGetData } from '@/redux/api/useGetData';
export default function page() {
  const [slider,setSlider] = useState([])
  useEffect(()=>{
    getData()
  },[])
  const getData =async ()=>{
    const hero = await useGetData("/api/heroslides")
    console.log(hero.data)
    setSlider(hero.data)
  }
  const [imageUpload, setImageUpload] = useState(null);
  const [loading,setLoading] = useState(false);
  const uploadFile = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        console.log(imageUpload)
        const fd = new FormData();
        fd.append("file",imageUpload);
        const res = await usePostDataProtected("/api/admin/heroslider/add",fd,{"Content-Type": "image/jpeg"});
        console.log(res.data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        
      }
  
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="Apps" title="Hero slider" />
      <div className='min-w-20 flex  gap-2 justify-center flex-wrap '>
        {slider.map((itm,index)=><div key={itm._id} className='relative'>
          <Actions  className='absolute top-1 right-2 z-20'></Actions>
          <div className='w-full h-full absolute top-0 left-0 hover:bg-[#0000006d] hover:text-white text-transparent  flex justify-center items-center text-4xl z-10'><span>{index}</span></div>
          <Image src={itm.heroImage} width={300} height={400} className='object-fill hover:bg-black h-full' /></div>)}
        
      </div>
      <div className="flex justify-center w-full mx-auto sm:max-w-7xl">
        <div className="flex flex-col items-center justify-center w-full h-auto my-6 bg-white sm:w-full sm:rounded-lg sm:shadow-xl">
          <div className="mt-10 mb-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">Upload your Hero Image</h2>
            <p className="text-xs text-gray-500">
              File should be of format .jpg, .jpeg, .png or .svg
            </p>
          </div>
          <form
            action="#"
            className="relative w-[90%] h-32 mb-10 rounded-lg shadow-inner "
          >
            <input type="file" id="file-upload" className="hidden" onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                }} />
            <label
              htmlFor="file-upload"
              className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
            >
              <p className="z-10 text-xs font-light text-center text-gray-500">
                Drag &amp; Drop your files here
              </p>
              <TiImage width={'12px'}/>
            </label>
          </form>
            <SubmitButton onClick={uploadFile} loading={loading} className='w-[90%] h-12 bg-black my-4 text-blue-50'>Upload</SubmitButton>
        </div>
      </div>

      
    </div>
  )
}
