import InputBtn from "@/components/Form/InputBtn";
import SubmitButton from "@/components/Form/SubmitButton";
import Modal from "@/components/Modal/Modal";
import { useGetData } from "@/redux/api/useGetData";
import { usePostDataProtected } from "@/redux/api/usePostData";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
const Category = ({register,btnClass}) => {
    const [category, setCategory] = useState([])
    const [image,setImage] = useState([])
    const [productCategory, setSubCategory] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [SubCategoryName, setSubCategoryName] = useState('')
    const [isCategory, setIsCategory] = useState()
    useEffect(() => {
        console.log("hello")
        const getCategorys = async () => {
            try {
              const res = await useGetData(
                "/api/category/all-category?limit=1000&fields=_id,categoryName"
              );
              const data = await useGetData(
                "/api/subcategory/all?limit=1000&fields=_id,SubCategoryName"
              );
              console.log(res.data, "category")
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
          getCategorys()
    }, []);

    const addCategory = async () => {
        try {
          const res = await usePostDataProtected(
            "/api/admin/Category/add",
            {
              categoryName,
              categoryImage: image
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
            { SubCategoryName, category: isCategory }
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
  return (
    <div className="w-full flex gap-x-3 mx-7">
      <div className="w-1/2"><InputBtn
        type="dropdown"
        id="dropdown"
        name="productCategory"
        label="select Category"       
        option={[
          ...productCategory.map((itm) => {
            return { name: itm.SubCategoryName, value: [itm._id] };
          }),
        ]}
        labelClass={`text-xs mt-4 text-[--first-color] ml-6 absolute top-6`}
        mainClass=" min-w-[16] mx-2"
        {...register("productCategory", {
          required: "Category is required",
        })}
      /></div>
      <div className=" w-1/2 flex gap-x-7 ml-3">
      <Modal btnClass={`${btnClass} px-4`} btnName="Add Category">
        <div className="flex flex-col">
          <InputBtn
            type="text"
            placeholder="image"
            name="image"
            onChange={(e) => setImage([e.target.value])}
          ></InputBtn>
          <InputBtn
            type="text"
            placeholder="category Name"
            label="category Name"
            name="categoryName"
            onSelect={(e) => setCategoryName(e.target.value)}
            onChange={(e) => setCategoryName(e.target.value)}
          ></InputBtn>

          <SubmitButton
            onClick={addCategory}
            value="submit"
            className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
          ></SubmitButton>
        </div>
      </Modal>
      <Modal btnClass={`${btnClass} px-4`} btnName="Add SubCategory">
        <div className="flex flex-col gap-y-2">
          <InputBtn
            type="text"
            placeholder="SubCategory Name"
            label="SubCategory Name"
            name="SubCategoryName"
            onChange={(e) => setSubCategoryName(e.target.value)}
          ></InputBtn>
          <InputBtn
            type="dropdown"
            id="dropdown"
            name="category"
            label="select SubCategory"
            option={[
              { name: "None", value: "None" },
              ...category.map((itm) => {
                return { name: itm.categoryName, value: itm._id };
              }),
            ]}
            onChange={(e) => setIsCategory(e.target.value)}
            labelClass={`text-xs mt-4 text-[--first-color] ml-6 absolute top-6`}
            mainClass="w-full"
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
  );
};

export default Category;
