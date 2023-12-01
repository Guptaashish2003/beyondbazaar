import React from 'react'

const OrderSummary = () => {
  return (
    <div className='flex p-4 w-full  flex-col justify-start'>
        <div className='flex w-full justify-between'>
            <div className='flex w-1/4 justify-evenly'>
                
            <p className='font-bold text-base text-gray-700'>1</p>
            <p>x</p>
            <p className='font-bold text-base text-gray-700'>product title</p>
            </div>
            <p className='font-bold text-base text-black'>₹ 999</p>
        </div>
        <hr className="my-3 w-full border border-slate-200" />
    </div>
  )
}

export default OrderSummary