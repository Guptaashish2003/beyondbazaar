import {createAsyncThunk} from "@reduxjs/toolkit";
import { useGetDataProtected } from "../api/useGetData";//____________________GET_userS____________________//
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, {rejectWithValue}) => {
    try {
      const res = await useGetDataProtected("/api/user/me")
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
