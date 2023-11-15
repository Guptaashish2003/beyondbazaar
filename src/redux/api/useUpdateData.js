import axiosBaseUrl from "@/redux/axiosBaseUrl";

export const useUpdateData = async (url, userData) => {
  
    const res = await axiosBaseUrl.put(`${url}`,userData);
    return res.data;

};
export const useUpdateDataProtected = async (url, userData) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axiosBaseUrl.put(`${url}`,userData, config);
    return res.data;

};


