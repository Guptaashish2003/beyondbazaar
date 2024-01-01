import axiosBaseUrl from "@/redux/axiosBaseUrl";
export const usePostData = async (url, data) => {
    const res = await axiosBaseUrl.post(url,data);
    return res.data;

};
export const usePostDataProtected = async (url, data,header="") => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {Authorization: `Bearer ${token}`,header},
      
    };
    const res = await axiosBaseUrl.post(url,data, config);
    return res.data;

};
