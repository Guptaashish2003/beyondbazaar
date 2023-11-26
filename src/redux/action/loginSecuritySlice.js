import { createSlice } from '@reduxjs/toolkit'

export const loginSecurity = createSlice({
  name: 'loginSecurity',
  initialState: {
    verification: false,
  },
  reducers: {
    verify: (state) => {
     
      state.verification= true
    },
  },
})

// Action creators are generated for each case reducer function
export const { verify} = loginSecurity.actions

export default loginSecurity.reducer