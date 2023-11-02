
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      state.totalQuantity += 1;
    //   state.totalPrice += action.payload.price;
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItemQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      item.quantity = action.payload.quantity;
    },
  },
});

export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
