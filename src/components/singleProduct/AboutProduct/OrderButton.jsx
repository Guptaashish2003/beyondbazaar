import React, { Children } from 'react'

const OrderButton = ({cart,className,children}) => {
  return (
    <button className={`my-4  ${className}`}>
          <div className="flex justify-center items-center gap-4">
            {cart}{children}
          </div>

    </button>
  )
}

export default OrderButton