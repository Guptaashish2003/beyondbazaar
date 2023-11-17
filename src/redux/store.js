"use client"
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './action/cartSlice';
import themeSettingReducer from './action/themeSettingReducer';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    themeSetting: themeSettingReducer,
  },
});

export default store;
