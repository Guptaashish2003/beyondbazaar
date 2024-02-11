"use client";
import { React, useEffect, useState } from "react";
import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import * as Yup from "yup";
import { usePostDataProtected } from "@/redux/api/usePostData";
import { useGetData, useGetDataProtected } from "@/redux/api/useGetData";
import { toast } from "react-toastify";
import { Header } from "@/components/Admin";
import { TagsInput } from "react-tag-input-component";

// import TagsInput from "react-tagsinput";
export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [productTag, setProductTag] = useState([]);
  const {add} = useParams()
  
  const [categoryTags, setCategoryTags] = useState([]);

  const validationSchema = Yup.object().shape({
    promocode: Yup.string().required("promocode is required"),
    discountType: Yup.string().required("Type is required"),
    discountValue: Yup.number().required("Value is required"),
    maxDiscount: Yup.number().required("Max Discount is required"),
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
    formData.promoProduct = productTag;
    formData.promoCategory = categoryTags;
    alert(JSON.stringify(formData));
    setLoading(true);

    try {
      const response = await usePostDataProtected(
        "/api/admin/promocode/add",
        formData
      );
      setLoading(false);
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

  const getProductCategory = async () => {
    try {
      const res = await useGetData(
        "/api/category/all-category?limit=1000&fields=_id,categoryName"
      );
      const { data } = await useGetDataProtected(
        "/api/product/all-product?limit=1000&fields=_id,productTags"
      );
      if (data || res) {
        setProduct(data.sort());
        setCategory(res.data.sort());
      }
      // if(add !== 'add'){
      //   const res = await useGetDataProtected(
      //     `/api/admin/promocode/edit/${add}`
      //   );
      //   if (res) {
      //     setProductTag(res.promoProduct);
      //     setCategoryTags(res.promoCategory);
      //   }
      // }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductCategory();
  }, []);
  const handleProudctTagsChange = (e) => {
    try {
     
      const newTags = [...productTag, e.target.value]
      newTags.filter((item) => item !== e.target.value)
      setProductTag(newTags)
      
    } catch (error) {
      toast.error(error.message); 
    }
  };
  const handleCategoryTags = (e) => {
    try {
     
      const newTags = [...categoryTags, e.target.value]
      newTags.filter((item) => item !== e.target.value)
      setCategoryTags(newTags)
      
    } catch (error) {
      toast.error(error.message); 
    }
  };
 
  const formdata = [
    {
      type: "text",
      value: "Enter your promocode",
      name: "promocode",
      id: "promocode",
      register: {
        ...register("promocode", {
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
      name: "discountType",
      id: "discountType",
      register: {
        ...register("discountType", {
          required: true,
        }),
      },
    },
    {
      type: "number",
      value: "Enter your discount value",
      name: "discountValue",
      id: "discountValue",
      register: {
        ...register("discountValue", {
          required: true,
          pattern: /^[0-9]*$/,
          minLength: 1,
        }),
      },
    },
    {
      type: "number",
      value: "Enter max discount",
      name: "maxDiscount",
      id: "maxDiscount",
      register: {
        ...register("maxDiscount", {
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
    {
      type: "dropdown",
      label: "select the product ",
      option: ["None", ...product.map((itm) => itm.productTags[0])],
      labelClass: "absolute top-6",
      name: "promoProduct",
      register:  {...register("promoProduct", { onChange: handleProudctTagsChange })}
    },
    {
      type: "dropdown",
      label: "select the Category Type",
      option: [{name:"None",value:"None"},...category.map((itm) =>{return {name:itm.categoryName,value:itm._id}})],
      labelClass: "absolute top-6",
      name: "promoCategory",
      register:  {...register("promoCategory", { onChange: handleCategoryTags })}
    },
  ];
 
  // if(loadingScreen){
  //   return(<Loading></Loading>)
  // }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="app" title="Add Promo promocode" />
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
                  // onclick={itm?.onclick}
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
          <div className="flex w-full flex-wrap gap-4 ">
            <TagsInput
              className=" border-gray-200 border-2"
              value={[...productTag]}
              name="productTag"
              placeHolder="Enter the product tags"
            />
            <TagsInput
              className=" border-gray-200 border-2"
              value={[...categoryTags]}
              name="categoryTags"
              placeHolder="Enter the category tags"
            />
          </div>

          <SubmitButton
            value="Add Promo promocode"
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
