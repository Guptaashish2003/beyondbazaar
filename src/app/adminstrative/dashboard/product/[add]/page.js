"use client";
import { React, use, useState } from "react";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Header } from "@/components/Admin";
import { TagsInput } from "react-tag-input-component";
import Modal from "@/components/Modal/Modal";
import { TiImage } from "react-icons/ti";
import Actions from "@/components/Admin/Action";
import Image from "next/image";
import { usePostDataProtected } from "@/redux/api/usePostData";
import { imageUpload } from "@/backend/utils/imageUpload";

export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [tag, setTag] = useState(["papaya"]);
  const [imageU, setImageU] = useState(null);

  const validationSchema = Yup.object().shape({
    pName: Yup.string().required("Name is required"),
    pRate: Yup.number().required("Price is required"),
    Qty: Yup.number().required("Quantity is required"),
    discription: Yup.string()
      .required("Discription is required")
      .min(20, "Description must be at least 20 characters")
      .max(200, "Description must be at most 200 characters"),
    category: Yup.string().required("Category is required"),
    stockAvail: Yup.string().required("Stock Availiblity is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (productData) => {
    productData.tag = tag;
    try {
      console.log("firstkflsdfasldk")
      setLoading(true);
      console.log(imageU)
      const fd = new FormData();
      fd.append("file",imageU);
      const imageUrl = await usePostDataProtected("/api/admin/product/add-product-image", fd);
      productData.image = imageUrl;
      console.log("imageuploadingij",imageUrl)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      
    }
    console.log(productData);
    alert(JSON.stringify(productData));
    // setLoading(true);
    // try {
    //   const res = await usePostDataProtected("/api/admin/product/add", productData);
    //   setLoading(false);
    //   if (res?.status) {
    //     toast.success(res?.message);
    //     reset();
    //   } else {
    //     toast.error(res?.message);
    //   }

    // } catch (error) {
    //   console.log(error);
    //   toast.error(error?.message);
      
    // }

  };

  const slider = [
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const btnClass =
    "bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300";
  const formdata = [
    {
      type: "text",
      value: "Enter Product Name",
      id: "name",
      name: "pName",
      register: {
        ...register("pName", {
          required: "Name is required",
        }),
      },
    },
    {
      type: "number",
      value: "Enter Product price",
      id: "price",
      name: "pRate",
      register: {
        ...register("pRate", {
          required: "Price is required",
        }),
      },
    },
    {
      type: "number",
      value: "Enter Product Quantity",
      id: "quantity",
      name: "Qty",
      register: {
        ...register("Qty", {
          required: "Quantity is required",
        }),
      },
    },
    {
      id: "dropdown",
      name: "stockAvail",
      type: "dropdown",
      label: "Product Available",
      option: ["true", "false"],
      register: {
        ...register("stockAvail", {
          required: "stocks availiblity is required",
        }),
      },
      labelClass: "absolute top-6",
    },
  ];
  const handleTagsChange = (newTags) => {
    // Update the tags state and react-hook-form value
    setTag(newTags);
    // Assuming "tag" is the name of your input field
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="app" title="Add Product" />
      <div className="md:w-11/12 px-8 md:px-16 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-2"
        >
          <div className="flex flex-wrap justify-between p-4 gap-y-4">
            <div className="flex  flex-wrap justify-between p-8 gap-y-4">
              {formdata.map((itm, index) => (
                <div
                  key={index}
                  className=" flex flex-col mr-3 relative w-[48%]"
                >
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

            <textarea
              id="descript"
              name="discription"
              className="my-6 px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white w-11/12"
              placeholder="Enter Product Description"
              {...register("discription", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
                maxLength: {
                  value: 200,
                  message: "Description must be at most 200 characters",
                },
              })}
            />

            <div className="w-full flex justify-evenly">
              <InputBtn
                type="dropdown"
                id="dropdown"
                name="category"
                label="select Category"
                option={["Category", "categories"]}
                labelClass={`text-xs mt-4 text-[--first-color] ml-6 absolute top-6`}
                mainClass="w-2/5 min-w-[16] mx-2"
                className="px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                {...register("category", {
                  required: "Category is required",
                })}
              />
              <Modal
                btnClass={`${btnClass} px-4`}
                btnName="Add Category"
              ></Modal>
              <Modal
                btnClass={`${btnClass} px-4`}
                btnName="Add SubCategory"
              ></Modal>
            </div>
            <div
            className="relative w-[90%] h-36 rounded-lg shadow-inner border-1 my-2 mx-auto"
          >
            <input type="file" id="file-upload" onChange={(e) => {
                    setImageU(e.target.files[0]);
                }} className="hidden" />
            <label
              htmlFor="file-upload"
              className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
            >
              <p className="z-10 text-xs font-light text-center text-gray-500">
                Drag &amp; Drop your files here
              </p>
              <TiImage width={'12px'}/>
            </label>
          </div>
          </div>
          {/* previewImage */}
          <div className=" min-w-20 flex  gap-2 justify-center flex-wrap h-24 p-1 ">
            {slider.map((itm, index) => (
              <div key={index} className="relative w-24 h-full">
                <Actions className="absolute top-1 right-2 z-20 text-white"></Actions>
                <div className="w-full h-full absolute top-0 left-0 hover:bg-[#0000006d] hover:text-white text-transparent  flex justify-center items-center text-4xl z-10">
                  <span>{index}</span>
                </div>
                <Image
                  src={itm}
                  width={300}
                  height={400}
                  className="object-fill hover:bg-black h-full w-full"
                />
              </div>
            ))}
          </div>
          {/* tag */}
          <TagsInput
            value={tag}
            id="tag"
            onChange={handleTagsChange}
            name="tag"
            placeHolder="Enter a tag"
          />

          <SubmitButton
            value="Add Product"
            // type="submit"
            loading={loading}
            // onSubmit={handleSubmit(onSubmit)}
            className={btnClass}
          />
        </form>
      </div>
    </div>
  );
}
