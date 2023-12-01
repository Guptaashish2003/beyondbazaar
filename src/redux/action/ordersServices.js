import {createAsyncThunk} from "@reduxjs/toolkit";
import {  toast } from 'react-toastify';
import { useGetDataProtected } from "../api/useGetData";
import { usePostDataProtected } from "../api/usePostData";
import { useDeleteData } from "../api/useDeleteData";
import { useUpdateData, useUpdateDataProtected } from "../api/useUpdateData";

//____________________CREATE_CASH_ORDER____________________//

//____________________CREATE_CARD_ORDER____________________//
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (body, {rejectWithValue}) => {
    try {
      const res = await usePostDataProtected("/api/user/create")
      console.log(res);
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
//____________________GET_ALL_ORDERS____________________//
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async ({limit, page}, {rejectWithValue}) => {
    try {
      const res = useGetDataProtected("/api/user/order/all-orders")
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
//____________________GET_ORDER_DETAILS____________________//
export const getOrderDetails = createAsyncThunk(
  "orders/getOrderDetails",
  async (orderId, {rejectWithValue}) => {
    try {
      const res = await useGetDataProtected("/api/user/order/order-detail")
      return res;
      
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
        if (typeof message === "string") {
          toast(message, "error");
        } else {
          message.forEach((el) => {
            toast(el.msg, "error");
          });
        }
      // console.log(message);
      return rejectWithValue(message)
      
      
    }
    
  }
);
//_____________________UPDATE_ORDER_TO_PAID____________________//
export const updateOrderToPaid = createAsyncThunk(
  "orders/updateOrderToPaid",
  async (orderId, {rejectWithValue}) => {
    try {
      const res = await useUpdateData(`/orders/${orderId}/is-paid`);
      pushNotification("Order Status Updated To Paid", "success");
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
//_____________________UPDATE_ORDER_TO_DELIVERED____________________//
export const updateOrderToDelivered = createAsyncThunk(
  "orders/updateOrderToDelivered",
  async (orderId, {rejectWithValue}) => {
    try {
      const res = await useUpdateData(`/orders/${orderId}/is-delivered`);
      pushNotification("Order Status Updated To Delivered ", "success");
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
//_____________________DELETE_ORDER____________________//
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, {rejectWithValue}) => {
    try {
      const res = await useDeleteData(`/orders/${orderId}`);
      pushNotification("Order Deleted Successfully", "success");
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
