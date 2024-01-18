import React, { forwardRef, useId } from 'react'

function InputBtn({type="text", placeholder="Enter Your Detail",labelClass,mainClass,name="",className="",label="",...props},ref) {
    const id = useId()
  return (
    <div className={`flex flex-col gap-y-1 ${mainClass}`}>
    {label && <label className={`${labelClass}`} htmlFor={id}>{label}</label>}
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
    </div >
  )
}

export default forwardRef(InputBtn)
