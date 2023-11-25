"use client";
import React from "react";
import Content from "@/components/Form/Content";
import Modal from "@/components/Modal/Modal";
import { toast } from "react-toastify";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import { useUpdateDataProtected } from "@/redux/api/useUpdateData";
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
  //   password: Yup.string()
  //     .required("Password is required")
  //     .min(6, "Password must be at least 6 characters long"),
  //   new_password: Yup.string()
  //     .required("Password is required")
  //     .min(6, "Password must be at least 6 characters long"),
  //   confirm_password: Yup.string()
  //     .required("Password is required")
  //     .min(6, "Password must be at least 6 characters long"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const changeName= async (data) => {
    console.log("im called");
    console.log(data);

    try {
      setLoading(true);
      const user = await useUpdateDataProtected("/api/user/update/", data);
      if (user.success) {
        setVerification(true);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error in change Name", error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  const changePassword = async (data) => {
    console.log("im called");
    console.log(data);

    try {
      setLoading(true);
      const user = await useUpdateDataProtected(
        "/api/user/update",
        data
      );
      if (user.success) {
        setVerification(true);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error in changePassword:", error);
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="border-2 border-solid border-gray-500 mt-32 w-1/2 mx-auto">
      <div className=" mx-auto w-full flex justify-between items-center p-5">
        <div className="flex items-center text-center flex-col gap-3">
          <h1 className="text-black text-lg">{"title"}</h1>
          <p className="text-gray-800">{"description"}</p>
        </div>

        <Modal
          btnClass={`w-16 border border-gray-600 rounded-md`}
          btnName={"edit"}
        >
          {verification ? (
            <div>
              <h2 className="font-bold text-center text-2xl text-green-500">
                Name change Succesfully
              </h2>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(changeName)}
              className="flex flex-col gap-4 py-2"
            >
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
                loading={loading}
                value="change name"
                type={"submit"}
                // onClick={handleSubmit(changeName)}
                className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
              />
            </form>
          )}
        </Modal>
      </div>
      <hr className="mt-4 border-1 border-slate-500 mx-auto " />
      <div className=" mx-auto w-full flex justify-between items-center p-5">
        <div className="flex items-center text-center flex-col gap-3">
          <h1 className="text-black text-lg">{"title"}</h1>
          <p className="text-gray-800">{"description"}</p>
        </div>
        <Modal
          btnClass={`w-16 border border-gray-600 rounded-md`}
          btnName={"edit"}
        >
          {verification ? (
            <div>
              <h2 className="font-bold text-center text-2xl text-green-500">
                Password update Succesfully
              </h2>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(changePassword) }} className="flex flex-col gap-4 py-2">
              <h2 className="font-bold text-center text-2xl text-[--first-color]">
                password update
              </h2>
              <div className="relative">
                <InputBtn
                  placeholder="Current Password"
                  name="password"
                  type={"password"}
                  // {...register("current_password", {
                  //   required: "Password is required",
                  //   minLength: {
                  //     value: 6,
                  //     message: "Password must be at least 6 characters long",
                  //   },
                  // })}
                  className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
              </div>
             {/* { errors.current_password && (
                <p className="text-red-500 text-xs">
                  {errors.current_password.message}
                </p>
              )} */}
              <div className="relative">
                <InputBtn
                  name="new_password"
                  placeholder="New Password"
                  type={passwordVisible ? "text" : "password"}
                  // {...register("new_password", {
                  //   required: "Password is required",
                  //   minLength: {
                  //     value: 6,
                  //     message: "Password must be at least 6 characters long",
                  //   },
                  // })}
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
              {errors.new_password && (
                <p className="text-red-500 text-xs">
                  {errors.new_password.message}
                </p>
              )}
              <div className="relative">
                <InputBtn
                  name="confirm_password"
                  placeholder="Confirm Password"
                  type={"password"}
                  // {...register("confirm_password", {
                  //   required: "Password is required",
                  //   minLength: {
                  //     value: 6,
                  //     message: "Password must be at least 6 characters long",
                  //   },
                  // })}
                  className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
              </div>

              <SubmitButton
                value="change password"
                loading={loading}
                type={"submit"}
                className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
              />
            </form>
          )}
        </Modal>
      </div>
      {/* <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} />
      <Content title={"name"} btnName={"edit"} description={"Ashish Gupta"} /> */}
    </div>
  );
};

export default page;
