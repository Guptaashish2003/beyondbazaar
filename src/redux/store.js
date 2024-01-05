"use client"
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './action/cartSlice';
import useReducer from './action/userSlice';
import orcerReducer from './action/ordersSlice';
import themeReducer from './action/themeSlice';
import loginSecurity from './action/loginSecuritySlice';
import userReducer from "@/redux/action/userSlice"
const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orcerReducer,
    user:userReducer,
    theme:themeReducer,
    loginSecurity: loginSecurity,
  },
});

export default store;
