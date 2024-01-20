"use client"
import { React, useState } from "react";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation'
import * as Yup from "yup";
import { usePostData } from "@/redux/api/usePostData";
import { toast } from "react-toastify";
import { Header } from "@/components/Admin";
import { TagsInput } from "react-tag-input-component";
import Modal from "@/components/Modal/Modal";
import { TiImage } from "react-icons/ti";
import Actions from "@/components/Admin/Action";
import Image from "next/image";
export default function page() {
  const router = useRouter()
  const [loading, setLoading] = useState();
  const [tag, setTag] = useState(["papaya"]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = ()=>{
    console.log("hello")
  }

  const slider = ['https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']

  const btnClass = "bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
  const formdata = [
    {type:"text",value:"Enter Product Name"},
    {type:"number",value:"Enter Product price"},
    {type:"number",value:"Enter Product Quantity"},
    {type:"dropdown",label:"Product Available",option:["true", "false"],labelClass:"absolute top-6"},
  ]

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="app" title="Add Product" />
      <div className="md:w-11/12 px-8 md:px-16 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-2"
        >
          <div className="flex flex-wrap justify-between p-4 gap-y-4">

          {formdata.map((itm,index)=><InputBtn
            key={index}
            type={itm?.type}
            placeholder={itm?.value}
            label={itm?.label}
            option={itm?.option}
            labelClass={`text-xs mt-4 text-[--first-color] ml-6 ${itm?.labelClass}`}
            mainClass="w-2/5 min-w-[16] mx-2"
            className="px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
          />)}

          <textarea id="discription" name="discription"  className="my-6 px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white w-full">
          Enter Product discription
          </textarea>
          <div className="w-full flex justify-evenly">
          <InputBtn
            type='dropdown'
            label="select Category"
            option={["Category","categarys"]}
            labelClass={`text-xs mt-4 text-[--first-color] ml-6 absolute top-6`}
            mainClass="w-2/5 min-w-[16] mx-2"
            className="px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
          />
          <Modal btnClass={`${btnClass} px-4` } btnName="Add Category"></Modal>
          <Modal btnClass={`${btnClass} px-4` } btnName="Add SubCategory"></Modal>
          </div>
          <div
            className="relative w-[90%] h-36 rounded-lg shadow-inner border-1 my-2 mx-auto"
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
          </div>
          </div>
          {/* previewImage */}
          <div className=' min-w-20 flex  gap-2 justify-center flex-wrap h-24 p-1 '>
            {slider.map((itm,index)=><div key={index} className='relative w-24 h-full'>
              <Actions className='absolute top-1 right-2 z-20 text-white'></Actions>
                <div className='w-full h-full absolute top-0 left-0 hover:bg-[#0000006d] hover:text-white text-transparent  flex justify-center items-center text-4xl z-10'><span>{index}</span></div>
                <Image src={itm} width={300} height={400} className='object-fill hover:bg-black h-full w-full' /></div>)}
              
          </div>
          {/* tag */}
          <TagsInput
            value={tag}
            onChange={setTag}
            name="tag"
            placeHolder="Enter a tag"
          />

          <SubmitButton
            value="Add Product"
            type="submit"
            loading={loading}
            onSubmit={handleSubmit(onSubmit)}
            className={btnClass}
          />
        </form>
      </div>
    </div>
  )
}
