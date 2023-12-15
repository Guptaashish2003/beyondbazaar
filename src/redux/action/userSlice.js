import {createSlice} from "@reduxjs/toolkit";
import {getUsers} from "./userService";

const initialState = {isMutation: {success: false},user: {user: []}};
export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      //_____________________GET_USER____________________//
      .addCase(getUsers.pending, (state) => {
        state.user.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.error = false;
        state.user.user = action.payload.data;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload;
      })
  },
});

<<<<<<< HEAD
export default userSlice.reducer;
=======
export default userSlice.reducer;
>>>>>>> 111d83d86a8b2755320598e03a515c6dcc132451
