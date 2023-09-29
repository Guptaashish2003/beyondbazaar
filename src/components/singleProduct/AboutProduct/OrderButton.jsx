import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

const OrderButton = ({cart}) => {
  return (
    <button className="mt-10 space-y-20 hover:scale-125 transition duration-500 ">
      <div className="w-full">
        <div className="flex-1 h-full w-96 mx-auto">
          <div className="flex w-full bg-white shadow rounded-lg py-4 px-16">
            <p className="m-auto inset-0 text-xl font-semibold leading-7 text-center text-gray-800">{cart}</p>
              <AiOutlineArrowRight className='h-6 w-6 mr-8' />
          </div>
        </div>
      </div>
    </button>
  )
}

export default OrderButton