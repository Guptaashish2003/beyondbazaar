"use client"
import InputBtn from '@/components/Form/InputBtn'
import SubmitButton from '@/components/Form/SubmitButton';
import React, { useState,useEffect } from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { usePostDataProtected } from '@/redux/api/usePostData';
import { useParams,useRouter,useSearchParams } from 'next/navigation';
import { useGetData } from '@/redux/api/useGetData';
import { toast } from "react-toastify";
import { errorTostHandler } from '@/redux/api/errorTostHandler';
export default function page() {
  const [reviewData,setReviewData] = useState([])
    const [loading,setLoading] = useState(false);
    const router = useRouter()
    const ratingValue = [1,2,3,4,5]
    const id = useParams()
    const searchParams = useSearchParams()
    console.log(searchParams)
    const reviewId = searchParams.get("reviewId")
    console.log("reviewId",reviewId)
    const [rating,setRating] = useState(0)
    const validationSchema = Yup.object().shape({
      title: Yup.string().required("title is required"),
      description: Yup.string()
        .required("description is required")
        .max(2000, "description must be less than 2000 characters"),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
  
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
  
    async function onSubmit(data) {
      try {
        setLoading(true);
        if(reviewId){
          const res = await usePostDataProtected(`/api/product-review/update/${reviewId}`, {...data,productId:id.id,rating});
          if (res.success) {
            toast.success(res.message,{autoClose: 1000, })
          }
        }
        else{
          const res = await usePostDataProtected("/api/product-review/add-review", {...data,productId:id.id,rating});
          if (res.success) {
            toast.success(res.message,{autoClose: 1000, })
          }
        }
        router.back()
        setLoading(false);
        
      } catch (error) {
        setLoading(false);
        router.back();
        errorTostHandler(error);
      }
      
    } 
    const getData = async () =>{
      try {
        const response  = await useGetData(`/api/product-review/my-review/${reviewId}`)
        if(response.success){
          setReviewData(response.data)
          setRating(response.data.rating)
        }
      } catch (error) {
        router.back()
        errorTostHandler(error);
      }
    }
    useEffect(() => {
      if(reviewId){
        getData()
      }
    }, [])
    return (
    <div className=' flex justify-center py-12 navMargin minScreen'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
            <InputBtn
             type='text' 
             defaultValue={(reviewId)? reviewData.title : ""}
             placeholder='title of review'
             label='Title of review'
             name='title'
             className="px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
             {...register("title", {
              required: "title is required",
              minLength: {
                value: 15,
                message: "title must be at least 15 characters long",
              },
            })}
              >
              </InputBtn>
                {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}

              <div className='h-8 flex justify-center items-center'>
               {ratingValue.map((itm)=>
               <TiStarFullOutline key={itm} onClick={()=>setRating(itm)} style={rating>=itm ? {color:"#b1acac"} : {color:'black'}} className={`w-1/12 h-full`}/>
               )}
                
              </div>
            <textarea
             name="description" id="" cols="30" rows="5"
             placeholder="review description"
             defaultValue={(reviewId)? reviewData.description : ""}
             className="my-2 px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
             {...register("description", {
              required: "description is required",
              maxLength: {
                value: 2000,
                message: "description must be less than 2000 characters",
              },
            })}
             >
                
             </textarea>
             {errors.description && (
              <p className="text-red-500 text-xs">{errors.description.message}</p>
            )}
             <SubmitButton
             value="Submit"
             type="submit"
             loading={loading}
             className="bg-[--first-color] rounded-sm text-white py-2 hover:scale-105 duration-300"
             ></SubmitButton>
        </form>
      
    </div>
  )
}
