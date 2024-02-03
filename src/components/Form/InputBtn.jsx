import React, { forwardRef, useId } from "react";

function InputBtn(
  {
    type = "text",
    placeholder = "Enter Your Detail",
    option,
    labelClass,
    mainClass,
    name = "",
    className = "",
    label = "",
    onClick,
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-y-1 relative ${mainClass}`}>
      {label && (
        <label className={`${labelClass}`} htmlFor={id}>
          {label}
        </label>
      )}
      {type === 'dropdown' ? (
        <select name={name} id={id} ref={ref} onClick={onClick}  className={`w-full 
        ${className}`} {...props}>
         { option.map((itm,index)=><option key={index} value={itm}>{itm}</option>)}
        </select>
      ) : (
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
      )}
    </div>
  );
}

export default forwardRef(InputBtn);
