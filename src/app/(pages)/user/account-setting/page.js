"use client";
import React from "react";
import YourAccSetting from "@/components/ProfileSetting/YourAccSetting";
import { FaShoppingBasket } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut,useSession } from "next-auth/react";
import {  useGetDataProtected } from "@/redux/api/useGetData";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const session = useSession();
  const handleYourOrders = () => {
    router.push("/your-orders");
  };

  const handleYourAddress = () => {
    router.push("/user/your-address");
  };

  const handleSignOut = async () => {
    try {
      const user = await useGetDataProtected("/api/user/sign-out");
      if (session.status === 'authenticated') {
      await signOut({ redirect: false });
      }
      console.log(user)
      if(user.success) {
        localStorage.removeItem("token");
       toast.success(user.message); 
      }
      router.push("/");
    } catch (error) {
      router.push("/");
      toast.error(error.message);
    }
  };

  return (
    <div className="mt-40   w-3/4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10 max-sm:gap-4 mx-auto my-4">
      <Link href="your-orders"  passHref>
        <YourAccSetting
          onClick={handleYourOrders}
          img={<FaShoppingBasket className="w-1/3  h-20 mx-auto max-md:w-1/2 object-cover" />}
          title={"Your Orders"}
          description={"Track Orders, Buy again "}
        />
      </Link>

      <Link href="/user/your-address" passHref>
        <YourAccSetting
          onClick={handleYourAddress}
          img={<FaLocationDot className="w-1/3 h-20 mx-auto max-md:w-1/2 object-cover" />}
          title={"Your Addresses"}
          description={"Edit your address for your gifts and orders  "}
        />
      </Link>

      <Link href="/user/your-address" passHref>
        <YourAccSetting
          img={<MdOutlineSecurity className="w-1/3 h-20 mx-auto max-md:w-1/2 object-cover" />}
          title={"Login & Security"}
          description={"Edit login, name, mobile number, email "}
        />
      </Link>

      <Link href="/user/your-payment-options" passHref>
        <YourAccSetting
          img={<FaRegCreditCard className="w-1/3 h-20 mx-auto max-md:w-1/2 object-cover" />}
          title={"Payment Options"}
          description={"Edit or add your payment options "}
        />
      </Link>

      <Link href="/user/your-address" passHref>
        <YourAccSetting
          img={<MdSupportAgent className="w-1/3 h-20 mx-auto max-md:w-1/2 object-cover" />}
          title={"Help & Support"}
          description={"Contact us, and we'll be happy to assist you, just like family."}
        />
      </Link>

        <YourAccSetting
          onClick={handleSignOut}
          img={<PiSignOutBold className="w-1/3 h-20 mx-auto max-md:w-1/2 object-cover" />}
          title={"Log Out"}
          description={"Thank you for visiting. I can't wait to meet you again."}
        />
    </div>
  );
};

export default Page;
