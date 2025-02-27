"use client";
import React from "react";
import SubmitButton from "@/components/Form/SubmitButton";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { RiHomeOfficeLine } from "react-icons/ri";
import InputBtn from "@/components/Form/InputBtn";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { usePostData } from "@/redux/api/usePostData";
import { errorTostHandler } from "@/redux/api/errorTostHandler";

const page = () => {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    phone: Yup.string()
      .required("Phone is required")
      .min(10, "Number must be at least 10 characters long")
      .max(10, "Number must be at least 10 characters long")
      .matches(/^[0-9]+$/, "Must be only digits"),
    message: Yup.string().required("Message is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {register, handleSubmit,  formState} = useForm(formOptions);
  const {errors} = formState;
  const onSubmit = async (data) => {
    try {
      setLoading(true);
    const postdata = await usePostData("api/contactUs", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });
    if (postdata.success) {
      toast(postdata.message);
    }
    setLoading(false);
    } catch (error) {
      setLoading(false);
      errorTostHandler(error)
    }
    
  };
  return (
    <>
      {/* ====== Contact Section Start */}
      <section className="relative z-10 overflow-hidden bg-white dark:bg-dark px-20 max-sm:px-12 lg:py-[120px] navMargin minScreen">
        <div className="max-sm:w-full mx-auto">
          <div className="flex flex-wrap -mx-4 lg:justify-between">
            <div className="w-full px-4 max-sm:w-11/12 lg:w-1/2 xl:w-6/12">
              <div className="mb-12 max-w-[570px] lg:mb-0">
                <h1 className="text-dark text-gray-700 mb-6 text-[32px] font-bold uppercase sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                  CONTACT US
                </h1>
                <p className="text-base leading-relaxed text-body-color dark:text-dark-6 mb-9">
                Feel the warmth of personalized support at your fingertips! Have questions or need assistance? Connect with our caring team now. Your joy and satisfaction fuel our commitment. Let's make your shopping experience extraordinary—contact us with a smile!
                </p>
                <div className="mb-8 flex w-full max-w-[370px] max-sm:w-11/12">
                  <div className="bg-primary/5 text-primary mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded sm:h-[70px] sm:max-w-[70px]">
                    <RiHomeOfficeLine className="w-1/2 h-1/2" />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark text-gray-700">
                      Our Location
                    </h4>
                    <p className="text-base text-body-color text-gray-600">
                        Maharani Enclave, Hastsal , Uttam Nagar, New Delhi, Delhi 110059
                    </p>
                  </div>
                </div>
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="bg-primary/5 text-primary mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded sm:h-[70px] sm:max-w-[70px]">
                    <IoCallOutline className="w-1/2 h-1/2" />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark text-gray-700">
                      Phone Number
                    </h4>
                    <p className="text-base text-body-color text-gray-600">
                      +91 9625110498
                    </p>
                  </div>
                </div>
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="bg-primary/5 text-primary mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded sm:h-[70px] sm:max-w-[70px]">
                    <CiMail className="w-1/2 h-1/2" />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark text-gray-700">
                      Email Address
                    </h4>
                    <a href="mailto:biyondbazaar@gmail.com?subject=Subject%20of%20the%20email&body=Body%20of%20the%20email" className="text-base text-body-color text-gray-600">
                      biyondbazaar@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="relative p-8 bg-white rounded-lg shadow-lg dark:bg-dark-2 sm:p-12">
                <form onSubmit = {handleSubmit(onSubmit)} >
                  <div className="mb-6">
                    <InputBtn
                    {...register("name", {required: "Name is required"})}
                      type="text"
                      placeholder="Your Name"
                      className="border-stroke dark:border-dark-3 text-gray-600 dark:bg-dark text-body-color focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="mb-6">
                    <InputBtn
                    {...register("email", {required: "Email is required"})}
                      type="email"
                      placeholder="Your Email"
                      className="border-stroke dark:border-dark-3 text-gray-600 dark:bg-dark text-body-color focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                  </div>
                  <div className="mb-6">
                    <InputBtn
                    {...register("phone", {required: "Phone is required"},
                    {minLength:  10, message: "Number must be at least 10 characters long",},
                    {maxLength:  10, message: "Number must be at least 10 characters long",},
                    {pattern:/^[0-9]+$/, message: "Must be only digits"})}
                      type="tel"
                      placeholder="Your Phone"
                      className="border-stroke dark:border-dark-3 text-gray-600 dark:bg-dark text-body-color focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none"
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                  </div>
                  <div className="mb-6">
                    <textarea
                      {...register("message", { required: "Message is required" })}
                      rows={6}
                      name="message" 
                      placeholder="Your Message"
                      className="border-stroke dark:border-dark-3 text-gray-600 dark:bg-dark text-body-color focus:border-primary w-full resize-none rounded border py-3 px-[14px] text-base outline-none"
                      defaultValue={""}
                    />
                    {errors.message && (
                      <p className="text-red-500">{errors.message.message}</p>
                    )}
                  </div>
                  <div>
                    <SubmitButton
                      loading={loading}
                      type="submit"
                      className="w-full px-4 py-2 font-medium text-center text-white bg-gray-800  hover:bg-black transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    >
                      Send Message
                    </SubmitButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Contact Section End */}
    </>
  );
};

export default page;
