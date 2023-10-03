import React from "react";
import loginp from "@/assets/loginp.jpg";
import Image from 'next/image'
import InputBtn from "@/components/Form/InputBtn";
import { AiFillEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import SubmitButton from "@/components/Form/SubmitButton";

const Login = () => {
  return (
      <section className="bg-image min-h-[--nav-space] max-md:items-center flex items-start justify-center">
        {/* <!-- login container --> */}
        <div className="bg-white flex mt-16 rounded-2xl max-md:m-4 shadow-lg max-w-3xl p-5 items-center">
          {/* <!-- form --> */}
          <div className="md:w-1/2 px-8 md:px-16 ">
            <h2 className="font-bold text-center text-2xl text-[--first-color]">Login</h2>
            <p className="text-xs mt-4 text-[--first-color]">
              If you are already a member, easily log in
            </p>

            <form  className="flex flex-col gap-4 py-2">
              <InputBtn type='email' placeholder="Email" className='px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'/>
              <div className="relative">
                <InputBtn placeholder="Password" type='text'className='px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'/>
                <AiFillEye  className=" absolute top-1/2 right-3 -translate-y-1/2"/>
              </div>
              <SubmitButton
                value="Login"
                type="submit"
                className='bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300'
              />
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <SubmitButton
                value="Login with Google"
                className="bg-white border py-2 w-full flex-row-reverse rounded-lg mt-5 text-sm hover:scale-105 duration-300 text-[--first-color]"
              >
                <FcGoogle className="text-2xl"/>
            </SubmitButton>

            <div className="mt-5 text-xs border-b border-gray-400 py-4 text-[#002D74]">
              <a href="#">Forgot your password?</a>
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[--first-color]">
              <p>Don't have an account?</p>
              <SubmitButton value="Register" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
               
              </SubmitButton>
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
};

export default Login;
