import axiosBaseUrl from "@/redux/axiosBaseUrl";
import { NextResponse } from "next/server";
export const useDeleteData = async (url) => {
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    };
    const res = await axiosBaseUrl.delete(url, config);
    return res.data;

};
