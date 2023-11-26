import React from "react";

function Pagination({className=""}) {
  return (
    <div className={`flex flex-row mx-auto gap-x-4 ${className}`}>
      <button
        type="button"
        className="bg-gray-800 text-white   border-gray-100 py-2 hover:bg-white hover:text-gray-800 px-3"
      >
        <div className="flex flex-row align-middle">
          <svg
            className="w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <p className="ml-2">Prev</p>
        </div>
      </button>
      <button
        type="button"
        className="bg-gray-800 text-white  py-2  border-gray-200 hover:bg-white hover:text-gray-800 px-3"
      >
        <div className="flex flex-row align-middle">
          <span className="mr-2">Next</span>
          <svg
            className="w-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}

export default Pagination;
