"use client";
import React from "react";
import { useState } from "react";
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { usePostData } from "@/redux/api/usePostData";
import { useRouter } from 'next/navigation'

const page = () => {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const onSubmit = async (data) => {
    setLoading(true);
    const postdata = await usePostData("/api/user/forgot-password", {
      email: data.email,
    });
    if (postdata.success) {
      toast(postdata.message);
    } else {
      toast.error(postdata.message);
    }
    setLoading(false);
    // if(!data.email){
    //     return
    // }
    Router.push("/login");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  return (
    <div className="max-w-4xl mx-auto mt-32">
      <div className="flex flex-col items-center justify-center  p-4 space-y-4 antialiased text-gray-900 bg-gray-100">
        <div className="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
          <h1 className=" mb-6 text-3xl font-bold text-center">Don't worry</h1>
          <p className="text-center mx-12">
            We are here to help you to recover your password. Enter the email
            address you used when you joined and we'll send you instructions to
            reset your password.
          </p>
          <form className="space-y-6 w-ful" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100"
              type="email"
              name="email"
              placeholder="Email address"
              required=""
            />
            <div>
              <SubmitButton
                loading={loading}
                type="submit"
                className="w-full px-4 py-2 font-medium text-center text-white bg-gray-800  hover:bg-black transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              >
                Send
              </SubmitButton>
            </div>
          </form>
          <div className="text-sm text-gray-600 items-center flex justify-between">
            <p className="text-gray-800 cursor-pointer hover:text-blue-500 inline-flex items-center ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </p>
            <p className="hover:text-gray-900 cursor-pointer">Need help?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
