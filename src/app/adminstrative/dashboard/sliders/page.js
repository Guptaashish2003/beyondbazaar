"use client"
import { Header } from '@/components/Admin';
import Actions from '@/components/Admin/Action'
import SubmitButton from '@/components/Form/SubmitButton';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { TiImage } from "react-icons/ti";
import { usePostDataProtected } from "@/redux/api/usePostData";
import { useGetData } from '@/redux/api/useGetData';
import { UploadButton   } from "@/backend/utils/uploadthing"
import { uploadImage } from '@/components/Admin/uploadImage';

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
  const [loading,setLoading] = useState(false);
  const [method,setMethod] = useState("firebase")
  const [preImage,setPreImage] = useState([])
  const [file, setFile] = useState(null);
  const uploadFile = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const res = await usePostDataProtected("/api/admin/heroslider/add",{url:preImage[0].url});
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
  
  };
  
  useEffect(() => {       
    file && uploadImage({file,setPreImage});
  }, [file]);
  const handleChange = (event) => {
    setMethod(event.target.value);
  };
  console.log("preview image",preImage)
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="Apps" title="Hero slider" />
      {/* main slide */}
      <div className='min-w-20 flex  gap-2 justify-center flex-wrap '>
        {slider.map((itm,index)=><div key={itm._id} className='relative'>
          <Actions  className='absolute top-1 right-2 z-20'></Actions>
          <div className='w-full h-full absolute top-0 left-0 hover:bg-[#0000006d] hover:text-white text-transparent  flex justify-center items-center text-4xl z-10'><span>{index}</span></div>
          <Image src={itm.heroImage} alt='hero images' width={300} height={400} className='object-fill hover:bg-black h-full' /></div>)}
        
      </div>


      <div className=" w-full mx-auto sm:max-w-7xl my-2">
        <div className='flex justify-center items-center gap-4 h-24 '>
          {preImage.map((img,index)=><Image key={index} src={img.url} alt='hero images' width={300} height={400} className='object-fill h-full w-auto' />)}
        </div>
        {/* select method  */}
        <div className='flex justify-center gap-x-4'>
        <label>
        <input
          type="radio"
          name="method"
          id="uploadthing"
          value="uploadthing"
          checked={method === 'uploadthing'}
          onChange={handleChange}
          className="mx-2"
        />
        uploadthing
      </label>
        <label>
        <input
          type="radio"
          name="method"
          id="firebase"
          value="firebase"
          checked={method === 'firebase'}
          onChange={handleChange}
          className="mx-2"
        />
        firebase
      </label>
        <label>
        <input
          type="radio"
          name="method"
          id="aws"
          value="aws"
          checked={method === 'aws'}
          onChange={handleChange}
          className="mx-2"
        />
        aws
      </label>
        </div>
       <div className="flex flex-col items-center justify-center w-full h-auto my-6 bg-white sm:w-full sm:rounded-lg sm:shadow-xl">
          <div className="mt-10 mb-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">Upload your Hero Image</h2>
            <p className="text-xs text-gray-500">
              File should be of format .jpg, .jpeg, .png or .svg
            </p>
          </div>
          { method==="uploadthing" &&<div>
          <UploadButton 
        className=" bg-[#333] text-white px-10 py-2 " 
        endpoint="imageUploader"
        onClientUploadComplete={res => {
          setPreImage(res)
        }}
        onUploadError={error => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
      />
          </div>}

          {method==="firebase" && <form
            action="#"
            className="relative w-[90%] h-32 mb-10 rounded-lg shadow-inner "
          >
            <input type="file" id="file-upload" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            <label
              htmlFor="file-upload"
              className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
            >
              <p className="z-10 text-xs font-light text-center text-gray-500">
                Drag &amp; Drop your files here
              </p>
              <TiImage width={'12px'}/>
            </label>
          </form>}
            <SubmitButton onClick={uploadFile} loading={loading} className='w-[90%] h-12 bg-black my-4 text-blue-50'>Upload</SubmitButton>
        </div>
      </div>

      
    </div>
  )
}
