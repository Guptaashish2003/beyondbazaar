"use client";
import { usePostDataProtected } from "@/redux/api/usePostData";
import Image from "next/image";
import React from "react";

function page() {
    const [imageUpload, setImageUpload] = React.useState(null);
    const [image,setImage] = React.useState('');
    const uploadFile = async (e) => {
        e.preventDefault();
        console.log(imageUpload)
        const fd = new FormData();
        fd.append("file",imageUpload);
       const res = await usePostDataProtected("/api/admin/test",fd,{"Content-Type": "image/jpeg"});
       console.log(res.data)
       setImage(res.data)
    };
    return (
        <div className="flex justify-center items-center w-screen h-screen">
        <form onSubmit={uploadFile} className="">
            <div>
            <input
                label="Image"
                placeholder="Choose image"
                accept="image/png,image/jpeg"
                type="file"
                onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                }}
            />
            <button className='w-20 h-6 bg-black text-white' type='submit'>submit</button>

            </div>

        </form>
            {
                image?<div className='flex relative'>
                   <span className='absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto'>link url <a className='text-blue-600' href={image} target='_black'>Link</a></span> 
                   <Image src={image} alt='image' width={40} height={60} className='w-28 h-32'></Image>
                </div>:""
            }
        </div>
     
  );
}

export default page;



