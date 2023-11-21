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
import { signOut } from "next-auth/react";

const Page = () => {
  const router = useRouter();

  const handleYourOrders = () => {
    router.push("/your-orders");
  };

  const handleYourAddress = () => {
    router.push("/your-address");
  };

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false });
    if (data) {
      router.push("/");
    }
  };

  return (
<<<<<<< HEAD
    <div className="mt-40 flex w-11/12 md:max-lg:justify-center max-sm:justify-center flex-row gap-10 max-sm:gap-4 mx-auto my-4 flex-wrap justify-start">
      <YourAccSetting
      href="/your-orders"
        onClick={handleYourOrders}
        img={<FaShoppingBasket className="w-1/2 h-1/2 object-cover" />}
        title={"Your Orders"}
        description={"Track Orders, Buy again "}
      />
      <YourAccSetting
        img={<MdOutlineSecurity className="w-1/2 h-1/2 object-cover" />}
        title={"Login & Security"}
        description={"Edit login,name ,mobile number, email "}
      />
      <YourAccSetting
        onClick={handleYourAddress}
        img={<FaLocationDot className="w-1/2 h-1/2 object-cover" />}
        title={"Your Adresses"}
        description={"Edit your address for your gifts and orders  "}
      />
      <YourAccSetting
        img={<FaRegCreditCard className="w-1/2 h-1/2 object-cover" />}
        title={"Payment Options"}
        description={"edit or add your payment options "}
      />
      <YourAccSetting
        img={<MdSupportAgent className="w-1/2 h-1/2 object-cover" />}
        title={"Help & Support"}
        description={
          "Contact us, and we'll be happy to assist you, just like family."
        }
      />
      <YourAccSetting
        onClick={handleSignOut}
        img={<PiSignOutBold className="w-1/2 h-1/2 object-cover" />}
        title={"Log Out"}
        description={"Thank  you for visiting. I can't wait to meet you again."}
      />
=======
    <div className="mt-40  w-11/12 md:max-lg:justify-center max-sm:justify-center flex-row gap-10 max-sm:gap-4 mx-auto my-4  justify-start">
      <Link href="/your-orders" className="w-full inline-block" passHref>
        <YourAccSetting
          onClick={handleYourOrders}
          img={<FaShoppingBasket className="w-1/2 h-1/2 object-cover" />}
          title={"Your Orders"}
          description={"Track Orders, Buy again "}
        />
      </Link>

      <Link href="/your-address" className="w-full inline-block" passHref>
        <YourAccSetting
          onClick={handleYourAddress}
          img={<FaLocationDot className="w-1/2 h-1/2 object-cover" />}
          title={"Your Addresses"}
          description={"Edit your address for your gifts and orders  "}
        />
      </Link>

      <Link href="/your-address" className="w-full inline-block" passHref>
        <YourAccSetting
          img={<MdOutlineSecurity className="w-1/2 h-1/2 object-cover" />}
          title={"Login & Security"}
          description={"Edit login, name, mobile number, email "}
        />
      </Link>

      <Link href="/your-address" className="w-full inline-block" passHref>
        <YourAccSetting
          img={<FaRegCreditCard className="w-1/2 h-1/2 object-cover" />}
          title={"Payment Options"}
          description={"Edit or add your payment options "}
        />
      </Link>

      <Link href="/your-address" className="w-full inline-block" passHref>
        <YourAccSetting
          img={<MdSupportAgent className="w-1/2 h-1/2 object-cover" />}
          title={"Help & Support"}
          description={
            "Contact us, and we'll be happy to assist you, just like family."
          }
        />
      </Link>

      <Link href="/" className="w-full inline-block" passHref>
        <YourAccSetting
          onClick={handleSignOut}
          img={<PiSignOutBold className="w-1/2 h-1/2 object-cover" />}
          title={"Log Out"}
          description={
            "Thank you for visiting. I can't wait to meet you again."
          }
        />
      </Link>
>>>>>>> d941ee364f1b9da71ec4fb752e3833e5e8ea84d1
    </div>
  );
};

export default Page;
