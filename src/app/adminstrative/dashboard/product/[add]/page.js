"use client";
import { React,  useEffect, useRef, useState } from "react";
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
import { uploadImage } from '@/components/Admin/uploadImage';
import { UploadButton   } from "@/backend/utils/uploadthing"
import { useGetData } from "@/redux/api/useGetData";
export default function page() {
  const router = useRouter();
  const [isCategory,setIsCategory] = useState()
  const [loading, setLoading] = useState();
  const [tag, setTag] = useState(["papaya"]);
  const [imageU, setImageU] = useState(null);
  const [slider,setSlider] = useState([])
  const [method,setMethod] = useState("firebase")
  const [category,setCategory] = useState([])
  const [productCategory,setSubCategory] = useState([])
  const [categoryName,setCategoryName] = useState('')
  const [SubCategoryName,setSubCategoryName] = useState('')

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Name is required"),
    productPrice: Yup.number().required("Price is required"),
    productQuantity: Yup.number().required("Quantity is required"),
    productDescription: Yup.string()
      .required("Discription is required")
      .min(20, "Description must be at least 20 characters"),
    productCategory: Yup.string().required("Category is required"),
    productAvailable: Yup.string().required("Stock Availiblity is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // const onSubmit = async (productData) => {
  //   productData.tag = tag;
  //   // try {
  //     // setLoading(true);
  //   alert(JSON.stringify(productData));
  //   // setLoading(true);
  //   // try {
  //   //   const res = await usePostDataProtected("/api/admin/product/add", productData);
  //   //   setLoading(false);
  //   //   if (res?.status) {
  //   //     toast.success(res?.message);
  //   //     reset();
  //   //   } else {
  //   //     toast.error(res?.message);
  //   //   }

  //   // } catch (error) {
  //   //   console.log(error);
  //   //   toast.error(error?.message);
      
  //   // }

  // };

  const onSubmit = async (productData) => {
    productData.productTags = tag;
    productData.productImage = slider;
    // alert(JSON.stringify(productData));
    setLoading(true);
    try {
      const res = await usePostDataProtected("/api/admin/product/add-product", productData);
      setLoading(false);
      console.log(res)
      if (res?.success) {
        toast.success(res?.message);
        reset();
      } else {
        toast.error(res?.message);
      }

    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.message);
      
    }

  };
  useEffect(() => {   
    const path = 'product'    
    imageU && uploadImage(path,imageU,slider,setSlider);
    getCategorys()
  }, [imageU]);
  const getCategorys = async () => {
    try {
      const res = await useGetData(
        "/api/category/all-category?limit=1000&fields=_id,categoryName"
      );
      const data = await useGetData(
        "/api/subcategory/all?limit=1000&fields=_id,SubCategoryName"
      );
      console.log(res.data)
      console.log(data)
      if (res) {
        setCategory(res.data.sort());
        setSubCategory(data.data.sort());
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      
    }
  }
  
  const addCategory = async () => {
    try {
      const res = await usePostDataProtected(
        "/api/admin/Category/add",
        {
          categoryName,
          categoryImage:slider
        }
      );
      console.log(res.data)
      if (res) {
        
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      
    }
  }
  const addSubCategory = async () => {
    const category = isCategory
    console.log(category)

    try {
      const res = await usePostDataProtected(
        "/api/admin/SubCategory/add",
        {SubCategoryName,category:isCategory}
      );
      if (res) {
        
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      
    }
  }

  const btnClass =
    "bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300";
  const formdata = [
    {
      type: "text",
      value: "Enter Product Name",
      id: "name",
      name: "productName",
      register: {
        ...register("productName", {
          required: "Name is required",
        }),
      },
    },
    {
      type: "number",
      value: "Enter Product price",
      id: "price",
      name: "productPrice",
      register: {
        ...register("productPrice", {
          required: "Price is required",
        }),
      },
    },
    {
      type: "number",
      value: "Enter Product Quantity",
      id: "quantity",
      name: "productQuantity",
      register: {
        ...register("productQuantity", {
          required: "Quantity is required",
        }),
      },
    },
    {
      id: "dropdown",
      name: "productAvailable",
      type: "dropdown",
      label: "Product Available",
      option: ["true", "false"],
      register: {
        ...register("productAvailable", {
          required: "stocks availiblity is required",
        }),
      },
      labelClass: "absolute top-6",
    },
  ];

  const handleTagsChange = (newTags) => {
    setTag(newTags);
  };
  const handleChange = (event) => {
    setMethod(event.target.value);
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
              name="productDescription"
              className="my-6 px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white w-11/12"
              placeholder="Enter Product Description"
              {...register("productDescription", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
              })}
            />

            <div className="w-full flex justify-evenly">
              <InputBtn
                type="dropdown"
                id="dropdown"
                name="productCategory"
                label="select Category"
                option={[...productCategory.map((itm) =>{return {name:itm.SubCategoryName,value:itm._id}})]}
                labelClass={`text-xs mt-4 text-[--first-color] ml-6 absolute top-6`}
                mainClass="w-2/5 min-w-[16] mx-2"
                className="px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                {...register("productCategory", {
                  required: "Category is required",
                })}
              />
              <Modal
                btnClass={`${btnClass} px-4`}
                btnName="Add Category"
              >
                   <div  className='flex flex-col'>
                      <InputBtn
                      type='text' 
                      placeholder='category Name'
                      label='category Name'
                      name='categoryName'
                      onChange={(e)=>setCategoryName(e.target.value)}
                      className="px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                        >
                        </InputBtn>

                      <SubmitButton
                      onClick={addCategory}
                      value="submit"
                      className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
                      ></SubmitButton>
                    </div>
              </Modal>
              <Modal
                btnClass={`${btnClass} px-4`}
                btnName="Add SubCategory"
              >
                   <div  className='flex flex-col gap-y-2'>
                      <InputBtn
                      type='text' 
                      placeholder='SubCategory Name'
                      label='SubCategory Name'
                      name='SubCategoryName'
                      onChange={(e)=>setSubCategoryName(e.target.value)}
                      className="px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                        >
                        </InputBtn>
                        <InputBtn
                          type="dropdown"
                          id="dropdown"
                          name="category"
                          label="select Category"
                          option={[...category.map((itm) =>{return {name:itm.categoryName,value:itm._id}})]}
                          onChange={(e)=>setIsCategory(e.target.value)}
                          labelClass={`text-xs mt-4 text-[--first-color] ml-6 absolute top-6`}
                          mainClass="w-full"
                          className="px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                        />
                      <SubmitButton
                      value="Submit"
                      onClick={addSubCategory}
                      className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
                      ></SubmitButton>
                    </div>
              </Modal>
            </div>
          </div>
            {/* select method  */}
            <div className='flex justify-center gap-x-4 mx-auto my-2'>
            <label>
            <input
              type="radio"
              name="method"
              id="uploadthing"
              value="uploadthing"
              checked={method === 'uploadthing'}
              onChange={handleChange}
              className="mx-2"
            />
            uploadthing
          </label>
            <label>
            <input
              type="radio"
              name="method"
              id="firebase"
              value="firebase"
              checked={method === 'firebase'}
              onChange={handleChange}
              className="mx-2"
            />
            firebase
          </label>
            <label>
            <input
              type="radio"
              name="method"
              id="aws"
              value="aws"
              checked={method === 'aws'}
              onChange={handleChange}
              className="mx-2"
            />
            aws
          </label>
            </div>


              {method==="firebase" && <div
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
              </div>}
              { method==="uploadthing" &&<div>
          <UploadButton 
        className=" bg-[#333] text-white px-10 py-2 " 
        endpoint="imageUploader"
        onClientUploadComplete={res => {
          if(slider.length > 0) {
            setSlider([...slider,res[0].url])
          }else{
            
            setSlider([res[0].url])
          }
        }}
        onUploadError={error => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
      />
          </div>}
          {/* previewImage */}
          <div className=" min-w-20 flex  gap-2 justify-center flex-wrap max-h-24 p-1 ">
            {slider.map((itm, index) => (
              <div key={index} className="relative w-24 h-full">
                <div className="w-full h-full absolute top-0 left-0 hover:bg-[#0000006d] hover:text-white text-transparent  flex justify-center items-center text-4xl z-10">
                  <span>{index}</span>
                </div>
                <Image
                  src={itm}
                  width={300}
                  height={400}
                  alt="hero image"
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
