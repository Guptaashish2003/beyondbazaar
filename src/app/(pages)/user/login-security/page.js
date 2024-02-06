"use client";
import React from "react";
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
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { errorTostHandler } from "@/redux/api/errorTostHandler";

const page = () => {
  const router = useRouter();
  const [verificationName, setVerificationName] = useState(false);
  const [verificationNumber, setVerificationNumber] = useState(false);
  const [verificationPassword, setVerificationPassword] = useState(false);
  const [loading, setLoading] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isVerify = useSelector((state) => state.loginSecurity.verification);
  const {user} = useSelector((state) => state.user.user)
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const nameValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });
  if (!isVerify) {
    router.back();
  }

  const passwordValidationSchema = Yup.object().shape({
    current_password: Yup.string().required("Current Password is required"),
    new_password: Yup.string()
      .required("New Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .min(6, "Password must be at least 6 characters long")
      .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
  });
  const numberValidationSchema = Yup.object().shape({
    number: Yup.string()
      .required("Number is required")
      .min(10, "Number must be at least 10 characters long")
      .max(10, "Number must be at least 10 characters long")
      .matches(/^[0-9]+$/, "Must be only digits"),
  });

  const formOptionsName = { resolver: yupResolver(nameValidationSchema) };
  const formOptionsPassword = { resolver: yupResolver(passwordValidationSchema) };
  const formOptionsNumber = { resolver: yupResolver(numberValidationSchema) };

  const {
    register: registerName,
    handleSubmit: handleSubmitName,

    formState: { errors: errorsName },
  } = useForm(formOptionsName);
  const {
    register: registerNumber,
    handleSubmit: handleSubmitNumber,
    formState: { errors: errorsNumber },
  } = useForm(formOptionsNumber);

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm(formOptionsPassword);
  const changeName = async (data) => {
    try {
      setLoading(true);
      const user = await useUpdateDataProtected("/api/user/update/", data);
      if (user.success) {
        setVerificationName(true);
      }
      
      setLoading(false);
      router.back();
    } catch (error) {
      setLoading(false);
      router.back();
      errorTostHandler(error);
    }
  };
  const changeNumber = async (data) => {
    try {
      setLoading(true);
      const user = await useUpdateDataProtected("/api/user/update/", {phoneNo: data.number});
      if (user.success) {
        setVerificationNumber(true);
        router.back();
      }
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      router.back();
      errorTostHandler(error);
    }
  };
  
  const changePassword = async (data) => {
    try {

      setLoading(true);
      const user = await useUpdateDataProtected(
        "/api/user/update-password",
        data
      );
      if (user.success) {
        setVerificationPassword(true);
      }
      
      setLoading(false);
      router.back();
    } catch (error) {
      setLoading(false);
      router.back();
      errorTostHandler(error);
    }
  };

  return (
    <div className=" flex  flex-col gap-2 mt-36 w-1/2 mx-auto navMargin minScreen">
      <div className=" mx-auto border-2 border-solid border-gray-500 rounded-md w-full flex justify-between items-center p-5">
        <div className="flex items-start flex-col gap-3">
          <h1 className="text-black text-lg">Name</h1>
          <p className="text-gray-800">{user.name}</p>
        </div>

        <Modal
          btnClass={`w-20 h-8 border border-gray-600 rounded-md`}
          btnName={"edit"}
        >
          {verificationName ? (
            <div>
              <h2 className="font-bold text-center text-2xl text-green-500">
                Name change Succesfully
              </h2>
              
            </div>
          ) : (
            <form
              onSubmit={handleSubmitName(changeName)}
              className="flex flex-col gap-4 py-2"
            >
              <h2 className="font-bold text-center text-2xl text-[--first-color]">
                Change Name
              </h2>
              <InputBtn
                type="text"
                name="name"
                placeholder="Enter your name"
                {...registerName("name", { required: "Name is required" })}
                className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              />

              {errorsName?.name && (
                <p className="text-red-500 text-xs">{errorsName.name.message}</p>
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
      <div className=" mx-auto border-2 border-solid border-gray-500 rounded-md w-full flex justify-between items-center p-5">
        <div className="flex items-start flex-col gap-3">
          <h1 className="text-black text-lg">Contact Number</h1>
          <p className="text-gray-800">{user.phoneNo }  receive security notifications with this mobile number.</p>
        </div>

        <Modal
          btnClass={`w-20 h-8 border border-gray-600 rounded-md`}
          btnName={"edit"}
        >
          {verificationNumber ? (
            <div>
              <h2 className="font-bold text-center text-2xl text-green-500">
                Phone Number Updated Succesfully
              </h2>
              
            </div>
          ) : (
            <form
              onSubmit={handleSubmitNumber(changeNumber)}
              className="flex flex-col gap-4 py-2"
            >
              <h2 className="font-bold text-center text-2xl text-[--first-color]">
                Contact Number
              </h2>
              <InputBtn
                type="tel"
                name="Number"
                placeholder="Enter your Phone Number"
                {...registerNumber(
                  "number",
                  { required: "Numbe r is required" },
                  {
                    minLength: 10,
                    message: "Number must be at least 10 characters long",
                  },
                  {
                    maxLength: 10,
                    message: "Number must be at least 10 characters long",
                  },
                  { pattern: /^[0-9]+$/, message: "Must be only digits" }
                )}
                className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              />
              {errorsNumber?.number && (
                <p className="text-red-500 text-xs">
                  {errorsNumber?.number?.message}
                </p>
              )}

              <SubmitButton
                loading={loading}
                value="Change Number"
                type={"submit"}
                // onClick={handleSubmit(changeName)}
                className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
              />
            </form>
          )}
        </Modal>
      </div>
      <hr className="mt-4 border-1 border-slate-500 mx-auto " />

      <div className=" mx-auto border-2 border-solid border-gray-500 rounded-md w-full flex justify-between items-center p-5">
        <div className="flex items-start flex-col gap-3">
          <h1 className="text-black text-lg">{"Change Password"}</h1>
          <p className="text-gray-800">{"*********"}</p>
        </div>
        <Modal
          btnClass={`w-20 h-8 border border-gray-600 rounded-md `}
          btnName={"edit"}
        >
          {verificationPassword ? (
            <div>
              <h2 className="font-bold text-center text-2xl text-green-500">
                Password update Succesfully
              </h2>
            </div>
          ) : (
            <form
              onSubmit={handleSubmitPassword(changePassword)}
              className="flex flex-col gap-4 py-2"
            >
              <h2 className="font-bold text-center text-2xl text-[--first-color]">
                password update
              </h2>
              <div className="relative">
                <InputBtn
                  placeholder="Current Password"
                  name="password"
                  type={"password"}
                  {...registerPassword("current_password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
                {errorsPassword.current_password && (
                  <p className="text-red-500 text-xs">
                    {errorsPassword.current_password.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <InputBtn
                  name="new_password"
                  placeholder="New Password"
                  type={passwordVisible ? "text" : "password"}
                  {...registerPassword("new_password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
                {errorsPassword.new_password && (
                  <p className="text-red-500 text-xs">
                    {errorsPassword.new_password.message}
                  </p>
                )}
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
              <div className="relative">
                <InputBtn
                  name="confirm_password"
                  placeholder="Confirm Password"
                  type={"password"}
                  {...registerPassword("confirm_password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
                {errorsPassword.confirm_password && (
                  <p className="text-red-500 text-xs">
                    {errorsPassword.confirm_password.message}
                  </p>
                )}
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
    </div>
  );
};

export default page;
