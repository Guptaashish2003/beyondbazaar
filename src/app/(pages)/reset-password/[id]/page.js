"use client";
import React from "react";
import InputBtn from "@/components/Form/InputBtn";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter,useParams  } from "next/navigation";
import SubmitButton from "@/components/Form/SubmitButton";
import { useUpdateData } from "@/redux/api/useUpdateData";
import { errorTostHandler } from "@/redux/api/errorTostHandler";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const validationSchema = Yup.object().shape({
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data) {
    try {
      setLoading(true);
      const updateData = await useUpdateData(`/api/user/reset-password/${params.id}`, {
        password: data.confirmPassword,
      });    
      if (updateData.success) {
        toast(updateData.message);
      } 
      setLoading(false);
      router.push("/login");
    } catch (error) {
      router.push("/login");
      errorTostHandler(error);
    }
   
  }
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 navMargin minScreen">
        \
        <div className="w-full p-6 shadow-lg rounded-lg  dark:border md:mt-0 sm:max-w-md sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                New Password
              </label>
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
                  className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-gray-100"
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
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Confirm password
              </label>
              <div className="relative">
                <InputBtn
                  placeholder="Password"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Password is required",
                    validate: (value) =>
                      value === watch("passowrd") || "Passwords do not match",
                  })}
                  className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-gray-100"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <SubmitButton
            loading={loading}
              type="submit"
              value="Reset Password"
              className="w-full text-white bg-gray-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:ring-gray-800"
            >
              
            </SubmitButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default page;
