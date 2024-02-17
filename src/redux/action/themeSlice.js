import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'counter',
    initialState: {
        screenSize: undefined,
        currentColor:'#03C9D7',
        currentMode:'Light',
        themeSettings:false,
        activeMenu:true,
        isClicked:{
            userProfile: false,
            notification: false,
          }

      },
    reducers: {
   
        handleClick: (state, action) => {
        state.isClicked = { ...state.isClicked, [action.payload]: true }
      },
      setIsClicked: (state, action) => {
        state.isClicked = {
          userProfile: false,
          notification: false,
        }
      },
      setActiveMenu: (state, action) => {
        state.activeMenu = action.payload
      },
      setScreenSize: (state, action) => {
        state.screenSize = action.payload
      },
      setThemeSettings: (state, action) => {
        state.themeSettings = action.payload
      },
      setCurrentColor: (state, action) => {
        state.currentColor = action.payload
      },
      setCurrentMode: (state, action) => {
        state.currentMode = action.payload

      },
      setColor: (state, action) => {
        state.currentColor = action.payload
        localStorage.setItem('colorMode', action.payload);
      },
      setMode: (state, action) => {
        state.currentMode = action.payload.target.value
        localStorage.setItem('themeMode', action.payload.target.value);
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setMode, setColor, handleClick,setCurrentColor,setIsClicked, setCurrentMode,setThemeSettings,setActiveMenu,setScreenSize } = themeSlice.actions
  
  export default themeSlice.reducer