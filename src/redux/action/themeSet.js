// redux/actions.js
export const SET_COLOR = 'SET_COLOR';
export const SET_MODE = 'SET_MODE';
export const SET_THEME_SETTINGS = 'SET_THEME_SETTINGS';

export const setColor = (color) => ({
  type: SET_COLOR,
  payload: color,
});

export const setMode = (mode) => ({
  type: SET_MODE,
  payload: mode,
});

export const setThemeSettings = (value) => ({
  type: SET_THEME_SETTINGS,
  payload: value,
});
