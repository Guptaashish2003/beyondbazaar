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
  const formdata = [1,2,3,4,5,6,7]
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="app" title="Add Promo Code" />
      <div className="md:w-11/12 px-8 md:px-16 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-2"
        >
          <div className="flex flex-wrap justify-between p-8">

          {formdata.map((itm,index)=><InputBtn
            key={index}
            type="email"
            placeholder="Email"
            label='Enter your email address'
            labelClass='text-xs mt-4 text-[--first-color] ml-6'
            mainClass="w-2/5 min-w-[16]"
            className="px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          />)}

          </div>

          <SubmitButton
            value="Login"
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
