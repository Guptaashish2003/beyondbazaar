"use client"
import React from 'react'
import { PiCreditCard } from "react-icons/pi";
import { RiLock2Line } from "react-icons/ri";
import { BiPencil } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsCalendarEvent } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const CreditCardInput = () => {
    const validationSchema = Yup.object().shape({
        Name: Yup.string().required("Full name is required"),
        card_number: Yup.number()
          .required("Card number is required")
          .min(16, "Card number must be at least 16 characters"),
        expire_date: Yup.string()
          .required("Expire date is required")
          .min(4, "Expire date must be at least 4 characters")
          .max(4, "Expire date must be at most 4 characters"),
        card_cvc: Yup.string()
          .required("CVC/CVV is required")
          .min(3, "CVC/CVV must be at least 3 characters")
          .max(4, "CVC/CVV must be at most 3 characters"),
      });
      const formOptions = { resolver: yupResolver(validationSchema) };
    
      const { register, handleSubmit, formState } = useForm(formOptions);
      const { errors } = formState;
      function onSubmit(data) {
        alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
        return false;
      }
    
      function onSubmit(data) {
        console.log(data);
        alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
        return false;
      }
  return (
    <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap gap-3 w-full p-5"
      >
        <label className="relative w-full flex flex-col">
          <span className="font-bold mb-3">Full Name</span>
          <input
            {...register("Name", { required: true, maxLength: 20 })}
            {...(errors.Name && {
              error: "Invalid name",
            })}
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
            type="text"
            name="Name"
            placeholder="John Doe"
          />
          <BiPencil className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" />
        </label>
        <label className="relative w-full flex flex-col">
          <span className="font-bold mb-3">Card number</span>
          <input
            {...register("card_number", {
              required: true,
              maxLength: 16,
              pattern: {
                value: /^[0-9\b]+$/,
              },
              minLength: 16,
            })}
            {...(errors.card_number && {
              error: "Invalid card number",
            })}
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
            type="text"
            name="card_number"
            placeholder="0000 0000 0000"
          />
          <PiCreditCard className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" />
        </label>
        <label className="relative flex-1 flex flex-col">
          <span className="font-bold mb-3">Expire date</span>
          <input
            {...register("expire_date", {
              required: true,
              minLength: 4,
              maxLength: 4,
              pattern: {
                value: /^[0-9\b]+$/,
              },
            })}
            {...(errors.expire_date && {
              error: "Invalid expire date",
            })}
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
            type="month"
            name="expire_date"
            placeholder="MM/YY"
          />
          <BsCalendarEvent className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" />
        </label>
        <label className="relative flex-1 flex flex-col">
          <span className="font-bold flex items-center gap-3 mb-3">
            CVC/CVV
            <span className="relative group">
              <span className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-black text-white">
                {" "}
                Hey ceci est une infobulle !
              </span>
              <AiOutlineQuestionCircle className="text-gray-400 h-4 w-4" />
            </span>
          </span>
          <input
            {...register("card_cvc", {
              required: true,
              minLength: 3,
              maxLength: 4,
            })}
            {...(errors.card_cvc && {
              error: "Invalid CVC/CVV",
            })}
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
            type="text"
            name="card_cvc"
            placeholder="•••"
          />
          <RiLock2Line className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" />
        </label>
        <div className="inline-flex items-end w-full justify-end">
          <button
            type="submit"
            className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
  )
}

export default CreditCardInput