import React from "react";

const ProductDetails = () => {
  return (
    <div>
      <hr className="mt-12 border border-slate-500 mr-40 ml-40" />
      <section className="bg-white shadow dark:bg-gray-800 mt-4">
        <div className="container flex flex-start  p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <a className="text-gray-800 cursor-pointer dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">
            Description
          </a>

          <a className="border-b-2  cursor-pointer border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
            Specification
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
