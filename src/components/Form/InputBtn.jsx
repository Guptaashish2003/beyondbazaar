import React, { forwardRef, useId } from 'react'

function InputBtn({type="text", placeholder="Enter Your Detail",name="",className="",label="",...props},ref) {
    const id = useId()
  return (
    <>
    {label && <label htmlFor={id}>{label}</label>}
   <input
    id={id}
    ref={ref}
    type={type}
    name={name}
    className={`w-full 
     ${className}`}
    placeholder={placeholder}
    {...props}
    />
    </>
  )
}

export default forwardRef(InputBtn)
