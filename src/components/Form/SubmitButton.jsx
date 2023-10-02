import React from 'react'
const SubmitButton = ({value="",type,className,children, onClick,...props}) => {
  return (
    <button type={type} {...props} className={`flex justify-center items-center gap-4 ${className}` } onClick={onClick}>
            {value}{children}

    </button>
  )
}

export default SubmitButton