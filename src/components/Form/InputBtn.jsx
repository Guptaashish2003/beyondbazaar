import React, { forwardRef, useId } from "react";

function InputBtn(
  {
    type = "text",
    placeholder = "Enter Your Detail",
    option,
    labelClass='',
    mainClass='',
    name = "",
    className = "",
    label = "",
    onClick,
    ...props
  },
  ref
) {
  const id = useId();
  if(option){
    console.log("type",typeof {name:"name"} === 'object')

  }
  return (
    <div className={`flex flex-col gap-y-1 relative ${mainClass}`}>
      {label && (
        <label className={`${labelClass}`} htmlFor={id}>
          {label}
        </label>
      )}
      {type === 'dropdown' ? (
        <select name={name} id={id} ref={ref} onClick={onClick}  className={`w-full px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white 
        ${className}`} {...props}>
         {typeof option[0] === 'object'? option.map((itm,index)=><option key={index} value={itm.value}>{itm.name}</option>): option.map((itm,index)=><option key={index} value={itm}>{itm}</option>)}
        </select>
      ) : (
        <input
          id={id}
          ref={ref}
          type={type}
          name={name}
          className={`w-full px-8 py-2  rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white outline-none 
     ${className}`}
          placeholder={placeholder}
          {...props}
        />
      )}
    </div>
  );
}

export default forwardRef(InputBtn);
