// redux/reducers.js
import { SET_COLOR, SET_MODE, SET_THEME_SETTINGS } from './themeSet';

const initialState = {
  currentColor: '#03C9D7',
  currentMode: 'Light',
  themeSettings: false,
};

const themeSettingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR:
      return { ...state, currentColor: action.payload };
    case SET_MODE:
      return { ...state, currentMode: action.payload };
    case SET_THEME_SETTINGS:
      return { ...state, themeSettings: action.payload };
    default:
      return state;
  }
};

export default themeSettingReducer;
