
import axiosBaseUrl from "@/redux/axiosBaseUrl";
import { NextResponse } from "next/server";
export const useGetData = async (url) => {
  try {  
    const res = await axiosBaseUrl.get(url);
   return (res.data)
  } catch (error) {
    console.log(error)
  }
};

export const useGetDataProtected = async (url) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log(config)

    const res = await axiosBaseUrl.get(`${url}`, config);

    const data = res.data;
    return data;
    
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
};
