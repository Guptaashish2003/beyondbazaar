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
export default function page() {
  const router = useRouter()
  const [loading, setLoading] = useState();

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
  const formdata = [
    {type:"text",value:"Enter your Code"},
    {type:"dropdown",label:"select the Type",option:["Percentage", "Fixed", "FreeShipping"],labelClass:"absolute -top-10"},
    {type:"number",value:"Enter your discount value"},
    {type:"number",value:"Enter max discount"},
    {type:"number",value:"Enter min order price"},
    {type:"number",value:"Enter max order price"},
    {type:"datetime-local",value:"Enter max order price"},
    {type:"datetime-local",value:"Enter max order price"},
    {type:"number",value:"Number of Limit"},
    {type:"dropdown",label:"select the Type",option:["true", "false"],labelClass:"absolute top-6"},

  ]
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="app" title="Add Promo Code" />
      <div className="md:w-11/12 px-8 md:px-16 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-2"
        >
          <div className="flex flex-wrap justify-between p-8 gap-y-4">

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

          </div>

          <SubmitButton
            value="Add Promo Code"
            type="submit"
            loading={loading}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
          />
        </form>
      </div>
    </div>
  )
}
