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
// import Loading from "@/app/loading";
export default function page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  async function onSubmit(data){
    console.log("promoData",data)
    alert(JSON.stringify(data))
    setLoading(true)
    try {
      const data = await usePostData("/api/admin/promocode/add",data)
      setLoading(false)
      console.log(data)
      if(data?.status){
        toast.success(data?.message)
        // router.push("/admin/promoCode")
        reset()
      }else{
        toast.error(data?.message)
      }
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  }
  const formdata = [
    {type:"text",value:"Enter your Code",name:"Code",register:  {...register("code", {
      required: true
    })}},
    {type:"dropdown",label:"select the Type",option:["Percentage", "Fixed", "FreeShipping"],labelClass:"absolute -top-10",name:"type",register:  {...register("type", {
      required: true
    })}},
    {type:"number",value:"Enter your discount value",name:"value",register:  {...register("value", {
      required: true
    })}},
    {type:"number",value:"Enter max discount",name:"maxDis",register:  {...register("maxDis", {
      required: true
    })}},
    {type:"number",value:"Enter min order price",name:"minOdr",register:  {...register("minOdr", {
      required: true
    })}},
    {type:"number",value:"Enter max order price",name:"maxOdr",register:  {...register("maxOdr", {
      required: true
    })}},
    {type:"datetime-local", label: "Enter start date", value:"",name:"startDate",register:  {...register("startDate", {
      required: true
    })}},
    {type:"datetime-local", label: "Enter end date", value:"",name:"endDate",register:  {...register("endDate", {
      required: true
    })}},
    {type:"number",value:"Number of Limit",name:"limit",register:  {...register("limit", {
      required: true
    })}},
    {type:"dropdown",label:"select the Type",option:["true", "false"],labelClass:"absolute top-6",name:"active",register:  {...register("active", {
      required: true
    })}},

  ]
  

  // if(loadingScreen){
  //   return(<Loading></Loading>)
  // }
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
            name={itm?.name}
            {...itm?.register}
            labelClass={`text-xs mt-4 text-[--first-color] ml-6 ${itm?.labelClass}`}
            mainClass="w-2/5 min-w-[16] mx-2"
            className="px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
          />)}

          </div>

          <SubmitButton
            value="Add Promo Code"
            type="submit"
            loading={loading}
            // onSubmit={handleSubmit(onSubmit)}
            className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
          />
        </form>
      </div>
    </div>
  )
}
