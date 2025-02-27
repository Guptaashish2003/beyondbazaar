"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import YourAccSetting from "@/components/ProfileSetting/YourAccSetting";
import { FaShoppingBasket } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useGetDataProtected } from "@/redux/api/useGetData";
import { toast } from "react-toastify";
import Modal from "@/components/Modal/Modal";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm,SubmitHandler  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from 'yup';
import { usePostData } from "@/redux/api/usePostData";
import {useDispatch, useSelector} from "react-redux";
import {verify} from "@/redux/action/loginSecuritySlice"; 
import { getUsers } from "@/redux/action/userService";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import { GrUserAdmin } from "react-icons/gr";
import { useUpdateData } from "@/redux/api/useUpdateData";
import { errorTostHandler } from "@/redux/api/errorTostHandler";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession()
  const [Loader,setLoader] = useState();
  const [fullScreenLoader , setFullScreenLoader] = useState(false);
  const [verification,setVerification] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {user,loading} = useSelector((state) => state.user.user)
  
  useLayoutEffect(()=>{
    dispatch(getUsers())
    
  },[])
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
      confirm_password: Yup.string().when(["byGoogle", "byGooglePass"], {
        is: (byGoogle, byGooglePass) => byGoogle && byGooglePass,
        then: Yup.string()
          .required("Confirm Password is required")
          .min(6, "Password must be at least 6 characters long")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
        else: Yup.string().notRequired(),
      }),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState,setValue } = useForm(formOptions);
  const { errors } = formState;
  const handleYourOrders = () => {
    router.push("/your-orders");
  };

  const handleYourAddress = () => {
    router.push("/user/your-address");
  };
  const handleSignOut = async () => {
    try {
      setFullScreenLoader(true);
      const user = await useGetDataProtected("/api/user/sign-out");
      if (user.success) {
        await signOut({ redirect: false });
        toast.success(user.message);
      }
      setFullScreenLoader(false);
      router.push("/");
    } catch (error) {
      setFullScreenLoader(false);
      router.push("/");
    }
  };
  const verifyPassword = async (data) => {
    try {
      setLoader(true);
    const user = await usePostData("/api/user/login", data);
    if (user.success) {
      setVerification(true);
      dispatch(verify(true));
    }
    
    setLoader(false);
    } catch (error) {
      setLoader(false);
     errorTostHandler(error);      
    }
  }
  const setPassword = async (data) => {
    try {

      setLoader(true);
      const user = await useUpdateData(
        "/api/user/set-password",
        data
      );
      if (user.success) {
        toast.success(user.message);
      }
      setLoader(false);
      router.back();
    } catch (error) {
      setLoader(false);
      errorTostHandler(error);
      router.back();
    }
  };
  

  return (
    <>
    {fullScreenLoader && <FullScreenLoader/>}
    
    <div className="min-h-screen flex justify-center items-center navMargin minScreen">
      <div className="   w-3/4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10 max-sm:gap-4 mx-auto">

        {/* order page btn  */}
        <Link href="your-orders" passHref>
          <YourAccSetting
            onClick={handleYourOrders}
            img={<FaShoppingBasket className="w-1/3  h-20 max-md:h-12 mx-auto max-md:w-1/2 object-cover" />}
            title={"Your Orders"}
            description={"Track Orders, Buy again "}
          />
        </Link>

        {/* add address btn  */}

        <Link href="/user/your-address" passHref>
          <YourAccSetting
            onClick={handleYourAddress}
            img={<FaLocationDot className="w-1/3 h-20 max-md:h-12 mx-auto max-md:w-1/2 object-cover" />}
            title={"Your Addresses"}
            description={"Edit your address for your gifts and orders  "}
          />
        </Link>

{/* change pass name btn  */}
        <Modal  btnName={
          <YourAccSetting
          onClick={()=>setValue("email",user.email)}
            img={<MdOutlineSecurity className="w-1/3 h-20 max-md:h-12 mx-auto max-md:w-1/2 object-cover" />}
            title={"Login & Security"}
            description={"Edit login, name, mobile number, email "}
          />
              }>
          {verification?
          <div>
            <h2 className="font-bold text-center text-2xl text-green-500">
            verification success
          </h2>
            {
            router.push("/user/login-security")
            }
          </div>:<form
            className="flex flex-col gap-4 py-2"
          >
           {user?.byGoogle && user.byGooglePass ?  <h2 className="font-bold text-center text-2xl text-[--first-color]">
            Set Password
          </h2>:<h2 className="font-bold text-center text-2xl text-[--first-color]">
            User Verification
          </h2>}
            <InputBtn
              type="email"
              placeholder="Email"
              
              readOnly={true}
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
            {
              user?.byGoogle  && user.byGooglePass? <div className="relative">
              <InputBtn
                placeholder="confirm Password"
                type= "password"
                {...register("confirm_password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className="px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              />
             
            </div>:""
            }
            {errors.confirm_password && (
              <p className="text-red-500 text-xs">{errors.confirm_password.message}</p>
            )}
            <SubmitButton
              value={user?.byGoogle  && user.byGooglePass? "Set Password":"Verify Password"}
              loading={Loader}
              onClick={user?.byGoogle  && user.byGooglePass? handleSubmit(setPassword) : handleSubmit(verifyPassword)}
              className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
            />
           
          </form>}

        </Modal>

{/* payment options page btn  */}
        <Link href="/user/your-payment-options" passHref>
          <YourAccSetting
            onClick ={()=>router.push("/user/your-payment-options")}
            img={<FaRegCreditCard className="w-1/3 h-20 max-md:h-12 mx-auto max-md:w-1/2 object-cover" />}
            title={"Payment Options"}
            description={"Edit or add your payment options "}
          />
        </Link>

        {/* Support btn  */}

        <Link href="/contact-us" passHref>
          <YourAccSetting
            onClick ={()=>router.push("/contact-us")}
            img={<MdSupportAgent className="w-1/3 h-20 max-md:h-12  mx-auto max-md:w-1/2 object-cover" />}
            title={"Help & Support"}
            description={"Contact us, and we'll be happy to assist you, just like family."}
          />
        </Link>
        {user?.role === "admin" ? <Link href="/adminstrative/dashboard" passHref>
          <YourAccSetting
            onClick ={()=>router.push("/adminstrative/dashboard")}
            img={<GrUserAdmin className="w-1/3 h-20 max-md:h-12  mx-auto max-md:w-1/2 object-cover" />}
            title={"Admin"}
            description={"Admin Panel"}
          />
        </Link>:""}

 {/* logout button  */}
        <YourAccSetting
          onClick={handleSignOut}
          img={<PiSignOutBold className="w-1/3 h-20 max-md:h-12 mx-auto max-md:w-1/2 object-cover" />}
          title={"Log Out"}
          description={"Thank you for visiting. I can't wait to meet you again."}
        />
      </div>

    </div>

    </>
  );
};

export default Page;
