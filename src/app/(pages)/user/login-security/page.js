"use client";
import React from "react";
import Content from "@/components/Form/Content";
import Modal from "@/components/Modal/Modal";
import { useGetDataProtected } from "@/redux/api/useGetData";
import { toast } from "react-toastify";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import { usePostData } from "@/redux/api/usePostData";
import { useState } from "react";

const page = () => {
  const [verification, setVerification] = useState(false);
  const [loading, setLoading] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    curruent_password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    new_password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirm_password: Yup.string()
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
          <div>
            <h2 className="font-bold text-center text-2xl text-green-500">
              Name change Succesfully
            </h2>
          </div>
        ) : (
          <form className="flex flex-col gap-4 py-2">
            <h2 className="font-bold text-center text-2xl text-[--first-color]">
              Change Name
            </h2>
            <InputBtn
              type="text"
              name="name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            />

            {errors?.name && (
              <p className="text-red-500 text-xs">{errors?.name?.message}</p>
            )}
            <SubmitButton
              value="change name"
              loading={loading}
              className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
            />
          </form>
        )}
      </Modal>
      <hr className="mt-4 border-1 border-slate-500 mx-auto " />
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
          <div>
            <h2 className="font-bold text-center text-2xl text-green-500">
              Password update Succesfully
            </h2>
          </div>
        ) : (
          <form className="flex flex-col gap-4 py-2">
            <h2 className="font-bold text-center text-2xl text-[--first-color]">
              password update
            </h2>
            <div className="relative">
              <InputBtn
                placeholder="Current Password"
                type={passwordVisible ? "text" : "password"}
                {...register("current_password", {
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
            <div className="relative">
              <InputBtn
                placeholder="New Password"
                type={passwordVisible ? "text" : "password"}
                {...register("mew_password", {
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
            <div className="relative">
              <InputBtn
                placeholder="Confirm Password"
                type={passwordVisible ? "text" : "password"}
                {...register("confirm_password", {
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
              value="change password"
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
