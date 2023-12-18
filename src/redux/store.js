"use client"
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './action/cartSlice';
import useReducer from './action/userSlice';
import orcerReducer from './action/ordersSlice';
import themeSettingReducer from './action/themeSettingReducer';
import loginSecurity from './action/loginSecuritySlice';
import userReducer from "@/redux/action/userSlice"
const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orcerReducer,
    user:userReducer,
    themeSetting: themeSettingReducer,
    loginSecurity: loginSecurity,
  },
});

export default store;
