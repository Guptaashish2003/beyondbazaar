import axiosBaseUrl from "@/redux/axiosBaseUrl";

export const useUpdateData = async (url, userData) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axiosBaseUrl.put(`${url}`,userData, config);
    return res.data;
    
  } catch (error) {
    console.log(error)
  }
};


