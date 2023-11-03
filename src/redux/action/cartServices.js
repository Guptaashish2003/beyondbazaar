import {createAsyncThunk} from "@reduxjs/toolkit";
import {  toast } from 'react-toastify';
import { useGetDataProtected } from "../api/useGetData";
import { usePostDataProtected } from "../api/usePostData";
import { useDeleteData } from "../api/useDeleteData";
import { useUpdateData } from "../api/useUpdateData";


//_____________________GET_USER_CART____________________//
export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetDataProtected("/api/cart/my-cart");

      return res;
    } catch (error) {
      // console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      // console.log(message);
      return rejectWithValue(message);
    }
  }
);
//____________________ADD_TO_CART____________________//
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (body, {rejectWithValue}) => {
    try {
      const res = await usePostDataProtected("/api/cart/add", body);
      toast("Product Added Successfully To Your Cart");
      return res;
    } catch (error) {
      // console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      if (typeof message === "string") {
        pushNotification(message, "error");
      } else {
        message.forEach((el) => {
          pushNotification(el.msg, "error");
        });
      }
      // console.log(message);
      return rejectWithValue(message);
    }
  }
);

//____________________REMOVE_FROM_CART____________________//
export const removeFromCart = createAsyncThunk(
  "reviews/deleteReview",
  async (cartItemId, {rejectWithValue}) => {
    try {
      const res = await useDeleteData(`/api/cart/delete/${cartItemId}`);
      toast("Cart Item Deleted Successfully", "success");
      return res;
    } catch (error) {
      // console.log("ERROR" + error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      // console.log(message);
      if (typeof message === "string") {
        pushNotification(message, "error");
      } else {
        message.forEach((el) => {
          pushNotification(el.msg, "error");
        });
      }
      return rejectWithValue(message);
    }
  }
);
//____________________UPDATE_CART_ITEM_QTY____________________//
export const updateCartItemQty = createAsyncThunk(
  "cart/updateCartItemQty",
  async ({cartItemId, quantity}, {rejectWithValue}) => {
    try {
      const res = await useUpdateData(`/cart/${cartItemId}`, {quantity});
      pushNotification("Cart Item Updated Successfully", "success");
      // console.log(res);
      return res;
    } catch (error) {
      // console.log("ERROR" + error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      // console.log(message);
      if (typeof message === "string") {
        pushNotification(message, "error");
      } else {
        message.forEach((el) => {
          pushNotification(el.msg, "error");
        });
      }
      return rejectWithValue(message);
    }
  }
);


