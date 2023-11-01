import axiosBaseUrl from "@/redux/axiosBaseUrl";
export const usePostData = async (url, data) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const res = await axiosBaseUrl.post(url,data, config);
    return res.data;

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
};
