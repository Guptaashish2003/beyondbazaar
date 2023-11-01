import axiosBaseUrl from "@/redux/axiosBaseUrl";
import { NextResponse } from "next/server";
export const useDeleteData = async (url) => {
  try {
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    };
    const res = await axiosBaseUrl.delete(url, config);
    return res.data;
    
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 }); 
  }
};
