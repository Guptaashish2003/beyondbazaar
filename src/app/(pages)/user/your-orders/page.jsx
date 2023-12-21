import React from 'react'
import OrderStatus from '@/components/OrderStatus/OrderStatus'

const page = () => {
  return (
    <div className="py-4 mt-32 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto min-h-screen">
    <div className="flex justify-start item-start space-y-2 flex-col">
      <p className="text-lg md:text-xl  dark:text-black font-semibold leading-6 xl:leading-5 text-gray-800">
        Your Orders
      </p>
    </div>
        <OrderStatus />
    </div>
  )
}

export default page