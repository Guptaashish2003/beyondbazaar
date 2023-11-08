"use client"
import React from 'react'
import { useRef } from 'react'
function Modal() {
    const showRef = useRef()
  return (
    <div className="w-screen h-screen flex justify-center items-center">

    <>
    <div onClick={()=>showRef?.current?.showModal()} className="login-icon-fix app-header-account display-flex flex-items-center">
        lOGIN...............
</div>
    <dialog ref={showRef} id="dialog" >
      <button onClick={()=>showRef?.current?.close()} aria-label="close" className="x">
        ❌
      </button>
    </dialog>
    </>
    </div>
  )
}

export default Modal
