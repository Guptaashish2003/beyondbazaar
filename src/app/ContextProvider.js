// app/ContextProvider.js
import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor, setMode, setThemeSettings } from '../redux/actions';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { currentColor, currentMode, themeSettings } = useSelector((state) => state);

  const handleClick = (clicked) => {
    // Use Redux actions here
    if (clicked === 'themeSettings') {
      dispatch(setThemeSettings(true));
    }
    // Add similar dispatch calls for other clicked values if needed
  };

  const setModeHandler = (e) => {
    // Use Redux actions here
    dispatch(setMode(e.target.value));
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColorHandler = (color) => {
    // Use Redux actions here
    dispatch(setColor(color));
    localStorage.setItem('colorMode', color);
  };

  return (
    <StateContext.Provider value={{ currentColor, currentMode, themeSettings, handleClick, setModeHandler, setColorHandler }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
