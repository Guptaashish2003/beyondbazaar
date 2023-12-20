import {createSlice} from "@reduxjs/toolkit";
import {
  getUserCart,
  addToCart,
  removeFromCart,
  updateCartItemQty,
} from "./Services";
const initialState = {isMutation: {success: false},userCart: {cart: []}, noOfProduct:0,totalPrice:0};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      //_____________________GET_USER_CART____________________//
      .addCase(getUserCart.pending, (state) => {
        state.userCart.loading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.userCart.loading = false;
        state.userCart.error = false;
        state.userCart.cart = action.payload.data;
        state.noOfProduct = action.payload.quantity;
        state.totalPrice = action.payload.totalprice;
        state.totalProduct = action.payload.totalquantity;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.userCart.loading = false;
        state.userCart.error = action.payload;
      })
      //____________________ADD_TO_CART____________________//
      .addCase(addToCart.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //____________________REMOVE_FROM_CART____________________//
      .addCase(removeFromCart.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
        state.noOfProduct = state.noOfProduct - 1;
        state.totalPrice = action.payload.totalprice;
        state.totalProduct = action.payload.totalquantity;
        state.userCart.cart = state.userCart.cart.filter((item) => item._id !== action.payload.data._id);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //____________________UPDATE_CART_ITEM_QTY____________________//
      .addCase(updateCartItemQty.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.isMutation.success = action.payload.status === 200 && true;
        state.noOfProduct = action.payload.quantity;
        state.totalPrice = action.payload.totalprice;
        state.totalProduct = action.payload.totalquantity;
      })
      .addCase(updateCartItemQty.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
     
  },
});

export default cartSlice.reducer;
