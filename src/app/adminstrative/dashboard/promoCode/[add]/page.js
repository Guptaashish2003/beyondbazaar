"use client";
import { React, useState } from "react";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { usePostData } from "@/redux/api/usePostData";
import { toast } from "react-toastify";
import { Header } from "@/components/Admin";
// import Loading from "@/app/loading";
export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    type: Yup.string().required("Type is required"),
    value: Yup.number().required("Value is required"),
    maxDis: Yup.number().required("Max Discount is required"),
    minOrder: Yup.number().required("Min Order is required"),
    maxOrder: Yup.number().required("Max Order is required"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
    limit: Yup.number().required("Limit is required"),
    active: Yup.string().required("Active is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  async function onSubmit(formData) {
  //   formData.startDate = new Date(formData.startDate).toISOString();
  // formData.endDate = new Date(formData.endDate).toISOString();
    console.log("promoData", formData);
    alert(JSON.stringify(formData));
    setLoading(true);
  
    try {
      const response = await usePostData("/api/admin/promocode/add", formData);
      setLoading(false);
      console.log(response);
  
      if (response?.status) {
        toast.success(response?.message);
        // router.push("/admin/promoCode")
        reset();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      // toast.error(error.response.data.message);
    }
  }
  
  

  const formdata = [
    {
      type: "text",
      value: "Enter your Code",
      name: "Code",
      id: "code",
      register: {
        ...register("code", {
          required: true,
          maxLength: 20,
          minLength: 3,
        }),
      },
    },
    {
      type: "dropdown",
      label: "select the Type",
      option: ["Percentage", "Fixed", "FreeShipping"],
      labelClass: "absolute -top-10",
      name: "type",
      id: "type",
      register: {
        ...register("type", {
          required: true,
        }),
      },
    },
    {
      type: "number",
      value: "Enter your discount value",
      name: "value",
      id: "value",
      register: {
        ...register("value", {
          required: true,
          pattern: /^[0-9]*$/,
          minLength: 1,
        }),
      },
    },
    {
      type: "number",
      value: "Enter max discount",
      name: "maxDis",
      id: "maxDis",
      register: {
        ...register("maxDis", {
          required: true,
          pattern: /^[0-9]*$/,
          minLength: 1,
        }),
      },
    },
    {
      type: "number",
      value: "Enter min order price",
      name: "minOrder",
      id: "minOrder",
      register: {
        ...register("minOrder", {
          required: true,
          pattern: /^[0-9]*$/,
        }),
      },
    },
    {
      type: "number",
      value: "Enter max order price",
      name: "maxOrder",
      id: "maxOrder",
      register: {
        ...register("maxOrder", {
          required: true,
        }),
      },
    },
    {
      type: "datetime-local",
      label: "Enter start date",
      value: "",
      name: "startDate",
      id: "startDate",
      register: {
        ...register("startDate", {
          required: true,
        }),
      },
    },
    {
      type: "datetime-local",
      label: "Enter end date",
      value: "",
      name: "endDate",
      register: {
        ...register("endDate", {
          required: true,
        }),
      },
    },
    {
      type: "number",
      value: "Number of Limit",
      name: "limit",
      register: {
        ...register("limit", {
          required: true,
        }),
      },
    },
    {
      type: "dropdown",
      label: "select the Type",
      option: ["true", "false"],
      labelClass: "absolute top-6",
      name: "active",
      register: {
        ...register("active", {
          required: true,
        }),
      },
    },
  ];

  // if(loadingScreen){
  //   return(<Loading></Loading>)
  // }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="app" title="Add Promo Code" />
      <div className="md:w-11/12 px-8 md:px-16 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-2"
        >
          <div className="flex  flex-wrap justify-between p-8 gap-y-4">
            {formdata.map((itm, index) => (
              <div key={index} className=" flex flex-col mr-3 relative w-[48%]">
                <InputBtn
                  type={itm?.type}
                  placeholder={itm?.value}
                  label={itm?.label}
                  option={itm?.option}
                  name={itm?.name}
                  {...itm?.register}
                  labelClass={`text-xs mt-4 text-[--first-color] ml-6 ${itm?.labelClass}`}
                  mainClass="w-full min-w-[16] mx-2"
                  className="px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                
                />
                {errors?.[itm?.name] && (
                  <span className="text-red-500 text-xs mt-2">
                    {errors?.[itm?.name]?.message}
                  </span>
                )}
              </div>
            ))}
          </div>

          <SubmitButton
            value="Add Promo Code"
            // type="submit" 
            loading={loading}
            // onSubmit={handleSubmit(onSubmit)}
            className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
          />
        </form>
      </div>
    </div>
  );
}
