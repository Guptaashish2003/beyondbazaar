import React from 'react'
import {AiOutlineStar} from 'react-icons/ai'
const ProductReview = () => {
  return (
    <div className='w-[80%] mx-auto mt-6'>
    <div className="flex items-center mb-2">
        <AiOutlineStar className="w-4 h-4 text-black" />
        <AiOutlineStar className="w-4 h-4 text-black" />
        <AiOutlineStar className="w-4 h-4 text-black" />
        <AiOutlineStar className="w-4 h-4 text-black" />
        <AiOutlineStar className="w-4 h-4 text-black" />
  
      <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
        4.95 out of 5
      </p>
    </div>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
      1,745 global ratings
    </p>
    <div className="flex items-center mt-4">
      <a
        href="#"
        className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        5 star
      </a>
      <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
        <div className="h-5 bg-black rounded" style={{ width: "70%" }} />
      </div>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        70%
      </span>
    </div>
    <div className="flex items-center mt-4">
      <a
        href="#"
        className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        4 star
      </a>
      <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
        <div className="h-5 bg-black rounded" style={{ width: "17%" }} />
      </div>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        17%
      </span>
    </div>
    <div className="flex items-center mt-4">
      <a
        href="#"
        className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        3 star
      </a>
      <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
        <div className="h-5 bg-black rounded" style={{ width: "8%" }} />
      </div>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        8%
      </span>
    </div>
    <div className="flex items-center mt-4">
      <a
        href="#"
        className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        2 star
      </a>
      <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
        <div className="h-5 bg-black rounded" style={{ width: "4%" }} />
      </div>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        4%
      </span>
    </div>
    <div className="flex items-center mt-4">
      <a
        href="#"
        className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        1 star
      </a>
      <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
        <div className="h-5 bg-black rounded" style={{ width: "1%" }} />
      </div>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        1%
      </span>
    </div>
  </div>
  )
}

export default ProductReview