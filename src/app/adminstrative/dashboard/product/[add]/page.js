"use client";
import { React, useRef, useState } from "react";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Header } from "@/components/Admin";
import { TagsInput } from "react-tag-input-component";
import Addvariants from "../_components/Addvariants";
// import Image from "next/image";
import { usePostDataProtected } from "@/redux/api/usePostData";
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
import ImageUploadModal from "../_components/ImageUploadModal";
import PreviewImage from "../_components/PreviewImage";


export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [tag, setTag] = useState(["papaya"]);
  const heroImageRef = useRef(null);
  const [preImage, setPreImage] = useState([]);
  const [rows, setRows] = useState([
    {
      variantType: "",
      variantDetails: [
        {
          color: "",
          price: 0,
          stock: 0,
          isAvailable: true,

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
    productData.productImage = preImage;
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


  if (!editor) {
    return null;
  }
  const isVariantAvailable = watch("isVariantAvailable");


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
            <Category register={register} btnClass={btnClass} />
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
          <ImageUploadModal
            preImage={preImage}
            setPreImage={setPreImage}
            button={<div className={`${btnClass} w-2/3 mx-auto text-center px-2 py-1`}>Add Image</div>}
            heroImageRef={heroImageRef}
          />
          {/* previewImage */}
             {preImage.length > 0 && <PreviewImage preImage={preImage} />}   

          {/* tag */}
          <TagsInput
            value={tag}
            id="tag"
            onChange={handleTagsChange}
            name="tag"
            placeHolder="Enter a tag"
          />
          <TextEditor editor={editor} />
          {/* submit button  */}
          <SubmitButton
            value="Add Product"
            type="submit"
            loading={loading}
            className={btnClass}
          />
        </form>
      </div>
    </div>
  );
}
