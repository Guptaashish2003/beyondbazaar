"use client"
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './action/cartSlice';
import themeSettingReducer from './action/themeSettingReducer';
import loginSecurity from './action/loginSecuritySlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    themeSetting: themeSettingReducer,
    loginSecurity: loginSecurity,
  },
});

export default store;
