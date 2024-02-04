import { toast } from "react-toastify";
export const errorTostHandler = (error)=>{
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
        if (typeof message === "string") {
          toast.error(message);
        } else {
          message.forEach((el) => {
            toast.error(el.msg);
          });
        }
}