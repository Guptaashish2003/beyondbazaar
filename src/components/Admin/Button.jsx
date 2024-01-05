"use client"
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {setIsClicked} from "@/redux/action/themeSlice"
const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  const { isClicked } = useSelector((state) => state.theme);
  const dispatch = useDispatch()

  return (
    <button
      type="button"
      onClick={() => dispatch(setIsClicked(isClicked))}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
