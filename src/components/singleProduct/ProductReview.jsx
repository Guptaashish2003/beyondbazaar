import React from "react";
import { AiOutlineStar } from "react-icons/ai";
const ProductReview = ({className}) => {
  return (
    <div className={`container max-w-sm mx-auto items-center text-center bg-white rounded drop-shadow-lg px-5 md:px-0 ${className}`}>
      <div className="pt-8 font-bold text-2xl tracking-wide">
        Customer reviews
      </div>
      <div className="flex mt-4 justify-center">
        <div className="flex items-center  py-3 px-2.5 space-x-2 leading-none text-center whitespace-nowrap align-baseline text-sm bg-gray-200 text-dark rounded-full">
          <div className="items-center">
            <ul className="flex justify-center">
              <li>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  className="w-4 text-yellow-500 mr-1"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  ></path>
                </svg>
              </li>
              <li>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  className="w-4 text-yellow-500 mr-1"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  ></path>
                </svg>
              </li>
              <li>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  className="w-4 text-yellow-500 mr-1"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  ></path>
                </svg>
              </li>
              <li>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  className="w-4 text-yellow-500 mr-1"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  ></path>
                </svg>
              </li>
              <li>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="star"
                  className="w-4 text-yellow-500 mr-1"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                  ></path>
                </svg>
              </li>
            </ul>
          </div>
          <div className="items-center font-bold">3.9/5</div>
        </div>
      </div>
      <div className="text-xs">40 customer reviews</div>
      <div className="pt-6 flex items-center justify-center">
        <ul className="flex flex-col w-full">
          <li className="flex flex-row">
            <div className="flex mx-auto justify-center items-center space-x-3 p-2 text-center">
              <div className="flex text-black text-xs">
                5
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  className="w-4 text-yellow-500"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  ></path>
                </svg>
              </div>
              <div className="w-48 bg-gray-200 h-3 rounded-md">
                <div
                  className="bg-green-600 h-3 rounded-md"
                  style={{ width: "40%" }}
                />
              </div>
              <div className="text-black text-xs">40%</div>
            </div>
          </li>
          <li className="flex flex-row">
            <div className="flex mx-auto justify-center items-center space-x-3 p-2 text-center">
              <div className="flex text-black text-xs">
                4
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  className="w-4 text-yellow-500"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  ></path>
                </svg>
              </div>
              <div className="w-48 bg-gray-200 h-3 rounded-md">
                <div
                  className="bg-green-500 h-3 rounded-md"
                  style={{ width: "30%" }}
                />
              </div>
              <div className="text-black text-xs">30%</div>
            </div>
          </li>
          <li className="flex flex-row">
            <div className="flex mx-auto justify-center items-center space-x-3 p-2 text-center">
              <div className="flex text-black text-xs">
                3
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  className="w-4 text-yellow-500"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  ></path>
                </svg>
              </div>
              <div className="w-48 bg-gray-200 h-3 rounded-md">
                <div
                  className="bg-yellow-500 h-3 rounded-md"
                  style={{ width: "15%" }}
                />
              </div>
              <div className="text-black text-xs">15%</div>
            </div>
          </li>
          <li className="flex flex-row">
            <div className="flex mx-auto justify-center items-center space-x-3 p-2 text-center">
              <div className="flex text-black text-xs">
                2
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  className="w-4 text-yellow-500"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  ></path>
                </svg>
              </div>
              <div className="w-48 bg-gray-200 h-3 rounded-md">
                <div
                  className="bg-yellow-600 h-3 rounded-md"
                  style={{ width: "12%" }}
                />
              </div>
              <div className="text-black text-xs">10%</div>
            </div>
          </li>
          <li className="flex flex-row">
            <div className="flex mx-auto justify-center items-center space-x-3 p-2 text-center">
              <div className="flex text-black text-xs">
                1
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  className="w-4 text-yellow-500"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  ></path>
                </svg>
              </div>
              <div className="w-48 bg-gray-200 h-3 rounded-md">
                <div
                  className="bg-red-500 h-3 rounded-md"
                  style={{ width: "5%" }}
                />
              </div>
              <div className="text-black text-xs">05%</div>
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-3 pb-8 items-center">
        <a
          href="#"
          className="px-2 py-2 text-xs text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-200 hover:text-black"
        >
          View all reviews
        </a>
      </div>
    </div>
  );
};

export default ProductReview;
