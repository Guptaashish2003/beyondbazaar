"use client";
import { React, useEffect, useState } from "react";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Header } from "@/components/Admin";
import { TagsInput } from "react-tag-input-component";
import { TiImage } from "react-icons/ti";
import Addvariants from "../_components/Addvariants";
// import Image from "next/image";
import { usePostDataProtected } from "@/redux/api/usePostData";
import { uploadImage } from "@/components/Admin/uploadImage";
import { UploadButton } from "@/backend/utils/uploadthing";
import Category from "../_components/Category";
import { useEditor } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextEditor from "../_components/TextEditor";



export default function page() {
  const router = useRouter();

  const [loading, setLoading] = useState();
  const [tag, setTag] = useState(["papaya"]);
  const [imageU, setImageU] = useState(null);
  const [slider, setSlider] = useState([]);
  const [method, setMethod] = useState("firebase");
  const [rows, setRows] = useState([
    {
      variantType: "",
      variantDetails: [
        {
          color: "",
          price: 0,
          stock: 0,
          isAvailable: true,
          variantImage: "",
        },
      ],
    },
  ]);
  const editor = useEditor({
    extensions: [
      StarterKit,

      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Youtube.configure({
        controls: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: `
      ${typeof window !== "undefined" && localStorage?.getItem("content")}
    `,
  });


  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Name is required"),
    productPrice: Yup.number().required("Price is required"),
    productQuantity: Yup.number().required("Quantity is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Price is required"),
    productCategory: Yup.string().required("Category is required"),
    productAvailable: Yup.string().required("Stock Availiblity is required"),
    // isvarieant availble is boolean and set by default to false
    isVariantAvailable: Yup.boolean(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState, watch } =
    useForm(formOptions);
  const { errors } = formState;

  const testData = {
    "productName": "Stylish T-Shirt",
    "productDescription": "A comfortable and stylish t-shirt available in various colors.",
    "productImage": [
      "https://example.com/images/tshirt-front.jpg",
      "https://example.com/images/tshirt-back.jpg"
    ],
    "slug": "stylish-t-shirt88",
      "title": "Stylish T-Shirt for Men",
      "description": "A high-quality t-shirt that comes in multiple colors and sizes.",
    "productPrice": 25.99,
    "productQuantity": 200,
    "productAvailable": true,
    "productTags": ["t-shirt", "fashion", "men", "clothing"],
    "productCategory": "65e2e68fbcd8462865848477",  // Example ObjectId of a SubCategory
    "mostPopular": true,
    "isVariantAvailable": true,
    "variants": [
      {
        "variantType": "color",
        "varientDetails": [
          {
            "color": "Red",
            "price": 25.99,
            "stock": 50,
            "isAvailable": true,
            "variantImage": "https://example.com/images/tshirt-red.jpg"
          },
          {
            "color": "Blue",
            "price": 26.99,
            "stock": 30,
            "isAvailable": true,
            "variantImage": "https://example.com/images/tshirt-blue.jpg"
          },
          {
            "color": "Green",
            "price": 24.99,
            "stock": 20,
            "isAvailable": false,
            "variantImage": "https://example.com/images/tshirt-green.jpg"
          }
        ]
      },
      {
        "variantType": "size",
        "varientDetails": [
          {
            "color": "Small",
            "price": 25.99,
            "stock": 50,
            "isAvailable": true
          },
          {
            "color": "Medium",
            "price": 26.99,
            "stock": 30,
            "isAvailable": true
          },
          {
            "color": "Large",
            "price": 24.99,
            "stock": 20,
            "isAvailable": false
          }
        ]
      }
    ],
    "rating": 4.5
  }
  

  const onSubmit = async (productData) => {
    productData.productTags = tag;
    productData.productImage = slider;
    if (productData.isVariantAvailable) productData.variants = rows;
    productData.productDescription = JSON.stringify(editor.getHTML());
    console.log(productData);
    // alert(JSON.stringify(productData));
    setLoading(true);
    try {
      const res = await usePostDataProtected(
        "/api/admin/product/add-product",
        // testData
        productData
      );
      setLoading(false);
      console.log(res);
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
    const path = "product";
    imageU && uploadImage(path, imageU, slider, setSlider);
    
  }, [imageU]);

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
    {
      type: "text",
      value: "Enter Seo Title",
      id: "title",
      name: "title",
      register: {
        ...register("title", {
          required: "itle is required",
        }),
      },
    },
    {
      type: "text",
      value: "Enter Seo Discription",
      id: "description",
      name: "description",
      register: {
        ...register("description", {
          required: "description is required",
        }),
      },
    },
  ];

  const handleTagsChange = (newTags) => {
    setTag(newTags);
  };
  const handleChange = (event) => {
    setMethod(event.target.value);
  };

  if (!editor) {
    return null;
  }
  const isVariantAvailable = watch("isVariantAvailable");
  console.log("isVariantAvailable", typeof slider);

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
                  />
                  {errors?.[itm?.name] && (
                    <span className="text-red-500 text-xs mt-2">
                      {errors?.[itm?.name]?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <Category register={register} btnClass={btnClass} slider={slider} />
            <div className="flex mx-6 my-3 gap-x-4 px-3 w-full justify-evenly">
              <label className="inline-flex w-1/2 items-center mb-5 cursor-pointer my-6">
                <input
                  type="checkbox"
                  value=""
                  {...register("isVariantAvailable")}
                  className="sr-only peer"
                />
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Variant Available
                </span>
                <div className="relative mx-2 w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800"></div>
              </label>
              <div className="w-1/2 m-auto">
                {isVariantAvailable && (
                  <Addvariants
                    btnClass={btnClass}
                    rows={rows}
                    setRows={setRows}
                  />
                )}
              </div>
            </div>
          </div>
          {/* select method  */}
          <div className="flex justify-center gap-x-4 mx-auto my-2">
            <label>
              <input
                type="radio"
                name="method"
                id="uploadthing"
                value="uploadthing"
                checked={method === "uploadthing"}
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
                checked={method === "firebase"}
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
                checked={method === "aws"}
                onChange={handleChange}
                className="mx-2"
              />
              aws
            </label>
          </div>
          {method === "firebase" && (
            <div className="relative w-[90%] h-36 rounded-lg shadow-inner border-1 my-2 mx-auto">
              <input
                type="file"
                id="file-upload"
                onChange={(e) => {
                  console.log("file", e.target.files[0]);
                  setImageU(e.target.files[0]);
                }}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
              >
                <p className="z-10 text-xs font-light text-center text-gray-500">
                  Drag &amp; Drop your files here
                </p>
                <TiImage width={"12px"} />
              </label>
            </div>
          )}
          {method === "uploadthing" && (
            <div>
              <UploadButton
                className=" bg-[#333] text-white px-10 py-2 "
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (Array.isArray(res) && res[0]?.url) {
                    if (slider.length > 0) {
                      setSlider((prevSlider) => [...prevSlider, res[0].url]);
                    } else {
                      setSlider([res[0].url]);
                    }
                  } else {
                    console.error("Unexpected response format: ", res);
                  }
                }}
                onUploadError={(error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          )}
          {/* previewImage */}
          {/* <div className=" min-w-20 flex  gap-2 justify-center flex-wrap max-h-24 p-1 ">
            {slider?.map((itm, index) => (
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
          </div> */}
          {/* tag */}
          <TagsInput
            value={tag}
            id="tag"
            onChange={handleTagsChange}
            name="tag"
            placeHolder="Enter a tag"
          />
          <TextEditor editor={editor} />
          {/* submit button  */}/
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
