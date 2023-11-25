"use client";
import React, { useEffect } from "react";
import { useRef } from "react";
function Modal({withoutBtn,onclose,btnClass,btnName="Button",btnIcon, children, className, ...props }) {
  const showRef = useRef();
  useEffect(()=>{
    if(withoutBtn) showRef?.current?.showModal()
  },[])
  return (
    <>
      {withoutBtn?"":<button
        onClick={() => showRef?.current?.showModal()}
        {...props}
        className={`${btnClass}   flex justify-center items-center`}
      >
       { btnName}{btnIcon}
      </button>}
      <dialog ref={showRef} id="dialog" {...props} className={`px-6 py-12 rounded-3xl border-none 
      shadow-[0_5px_30px_0_rgba(0, 0, 0, 0.1)] m-auto text-center ${className}`}>
        <button
          onClick={() => {
            showRef?.current?.close();
            if (onclose) {
              onclose() 
            }

          }}
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
