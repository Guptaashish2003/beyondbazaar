"use client";
import React from "react";
import { useRef } from "react";
function Modal({btnClass,btnName="Button", children, className, ...props }) {
  const showRef = useRef();
  return (
    <>
      <button
        onClick={() => showRef?.current?.showModal()}
        {...props}
        className={`${btnClass} flex justify-center items-center`}
      >
       { btnName}
      </button>
      <dialog ref={showRef} id="dialog" {...props} className={`px-6 py-12 rounded-3xl border-none 
      shadow-[0_5px_30px_0_rgba(0, 0, 0, 0.1)] m-auto text-center ${className}`}>
        <button
          onClick={() => showRef?.current?.close()}
          aria-label="close"
          className="x cursor-pointer  border-none absolute top-4 right-3"
        >
          ❌
        </button>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
