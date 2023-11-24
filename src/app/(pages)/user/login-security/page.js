"use client"
import React from "react";
import Content from "@/components/Form/Content";
import Modal from "@/components/Modal/Modal";
import { useGetDataProtected } from "@/redux/api/useGetData";
import { toast } from "react-toastify";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm,SubmitHandler  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from 'yup';
import { usePostData } from "@/redux/api/usePostData";
import { useState } from "react";

const page = () => {
  const [verification,setVerification] = useState(false);
  const [loading,setLoading] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <div className="border-2 border-solid border-gray-500 mt-32 w-1/2 mx-auto">
      <Modal
        btnName={
          <Content
            title={"name"}
            btnName={"edit"}
            description={"Ashish Gupta"}
          />
        }
      >
        {verification ? (
          <div>Security form</div>
        ) : (
          <form className="flex flex-col gap-4 py-2">
            <h2 className="font-bold text-center text-2xl text-[--first-color]">
              User Verification
            </h2>
            <InputBtn
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            />
            <div className="relative">
              <InputBtn
                placeholder="Password"
                type={passwordVisible ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 -translate-y-1/2"
              >
                {passwordVisible ? (
                  <AiFillEyeInvisible className="text-[--eye-color]" />
                ) : (
                  <AiFillEye className="text-[--eye-color]" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
            <SubmitButton
              value="Verify Password"
              loading={loading}
              className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
            />
          </form>
        )}
      </Modal>
      {/* <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} /> */}
    </div>
  );
};

export default page;
