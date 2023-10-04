"use client"
import React from 'react'
import loginp from "@/assets/loginp.jpg";
import Image from 'next/image'
import InputBtn from "@/components/Form/InputBtn";
import { AiFillEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const RegistrationPage = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid')
});
const formOptions = { resolver: yupResolver(validationSchema) };


const { register, handleSubmit, reset, formState } = useForm(formOptions);
const { errors } = formState;

function onSubmit(data) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    return false;
}
  return (
      <section className="bg-image min-h-[--nav-space] max-md:items-center  flex items-start justify-center">
        {/* <!-- login container --> */}
        <div className="bg-white mt-16 flex rounded-2xl max-md:m-4 shadow-lg max-w-3xl p-5 items-center">
          {/* <!-- form --> */}
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-center capitalize text-2xl text-[--first-color]">Register</h2>

            <SubmitButton
              
                value="Login Up with Google"
                className="bg-white border py-2 w-full flex-row-reverse rounded-lg mt-5 text-sm hover:scale-105 duration-300 text-[--first-color]"
              >
                <FcGoogle className="text-2xl"/>
            </SubmitButton>
            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <p className="text-xs text-center capitalize mt-4 text-[--first-color]">
               easy sign up with e-mail
            </p>

            <form  className="flex flex-col gap-4 py-2">
              <InputBtn type='text' placeholder="Name" className='px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'/>
              <InputBtn type='email' placeholder="Email" className='px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'/>
              <div className="relative">
                <InputBtn placeholder="Password" type='text'className='px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'/>
                <AiFillEye  className=" absolute top-1/2 right-3 -translate-y-1/2"/>
              </div>
              <SubmitButton
              onSubmit={handleSubmit(onSubmit)}
                value="Register"
                type="submit"
                className='bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300'
              />
            </form>

            <div className="mt-3 text-xs flex justify-between items-center text-[--first-color]">
            <p className="mt-6 text-xs text-gray-600 text-center">
                I agree to abide by templatana's
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Terms of Service
                </a>
                and its
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          {/* <!-- image --> */}
          <div className="md:block hidden w-1/2">
            <Image
            src={loginp}
            className="rounded-2xl w-full h-full"
            />
                
          </div>
        </div>
      </section>
  );
}

export default RegistrationPage