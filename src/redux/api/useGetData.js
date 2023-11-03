
import axiosBaseUrl from "@/redux/axiosBaseUrl";

export const useGetData = async (url) => {
    const res = await axiosBaseUrl.get(url);
   return (res.data)

};

export const useGetDataProtected = async (url) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log(config)

    const res = await axiosBaseUrl.get(`${url}`, config);

    const data = res.data;
    return data;
    
};
