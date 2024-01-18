import Actions from '@/components/Admin/Action'
import Image from 'next/image'
import React from 'react'
import { TiImage } from "react-icons/ti";
export default function page() {
  const slider = ['https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <div className='min-w-20 flex h-48 gap-2 justify-center flex-wrap '>
        {slider.map((itm,index)=><div key={index} className='relative'>
          <Actions className='absolute top-1 right-2 z-20'></Actions>
          <div className='w-full h-full absolute top-0 left-0 hover:bg-[#0000006d] hover:text-white text-transparent  flex justify-center items-center text-4xl z-10'><span>{index}</span></div>
          <Image src={itm} width={300} height={400} className='object-fill hover:bg-black h-full' /></div>)}
        
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
            <input type="file" id="file-upload" className="hidden" />
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
        </div>
      </div>

      
    </div>
  )
}
