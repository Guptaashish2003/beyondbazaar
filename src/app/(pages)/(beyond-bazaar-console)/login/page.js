"use client"
import {React,useState} from "react";
import loginp from "@/assets/loginp.jpg";
import Image from "next/image";
import InputBtn from "@/components/Form/InputBtn";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation'
import * as Yup from "yup";
import { usePostData } from "@/redux/api/usePostData";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const Login = () => {

  const router = useRouter()
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

  async function onSubmit(data) {
    try {
      setLoading(true);
    const user = await usePostData("/api/user/login", data);
    if (user.success) {
      localStorage.setItem("token",user.token);
      router.push("/")
      toast.success(user.message,{autoClose: 1000, })
      setLoading(false);
    }
    else{
      setLoading(false);
      router.push("/")
      toast.error(user.message,{autoClose: 1000, })

    }
    } catch (error) {
      setLoading(false);
      router.push("/")
      toast.error(user.message,{autoClose: 1000, })
    }
    

    // return false;
  }
  return (
    <section className="bg-image min-h-[--nav-space] lg:mt-[--nav-spc] max-md:items-center flex items-start justify-center">
      {/* <!-- login container --> */}
      <div className="bg-white flex mt-16 rounded-2xl max-md:m-4 shadow-lg max-w-3xl p-5 items-center">
        {/* <!-- form --> */}
        <div className="md:w-1/2 px-8 md:px-16 ">
          <h2 className="font-bold text-center text-2xl text-[--first-color]">
            Login
          </h2>
          <p className="text-xs mt-4 text-[--first-color]">
            If you are already a member, easily log in
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-2"
          >
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
              value="Login"
              type="submit"
              loading={loading}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
            />
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <SubmitButton
            value="Login with Google"
            onClick={()=>signIn("google")}
            className="bg-white border py-2 w-full flex-row-reverse rounded-lg mt-5 text-sm hover:scale-105 duration-300 text-[--first-color]"
          >
            <FcGoogle className="text-2xl" />
          </SubmitButton>

          <div className="mt-5 text-xs border-b cursor-pointer border-gray-400 py-4 text-[#002D74]"            onClick={()=>router.push("/forgot-password")}>
            <a>Forgot your password?</a>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[--first-color]">
            <p>Don't have an account?</p>
            <SubmitButton
              value="Register"
              onClick={()=>router.push("/register")}
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
            ></SubmitButton>
          </div>
        </div>

        {/* <!-- image --> */}
        <div className="md:block hidden w-1/2">
          <Image src={loginp} alt="Login hero image" className="rounded-2xl w-full h-full" />
        </div>
      </div>
    </section>
  );
};

export default Login;
