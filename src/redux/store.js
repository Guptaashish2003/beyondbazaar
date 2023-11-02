"use client"
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './action/cartSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
