"use client"
import React, { useState } from "react";

const ProductDetails = () => {
  const [showDescription, setShowDescription] = useState(true);

  const toggleDescription = () => {
    setShowDescription(true);
  };

  const toggleSpecification = () => {
    setShowDescription(false);
  };

  return (
    <div>
      <hr className="mt-12 border border-slate-500 mx-auto w-[80%]" />
      <section className="bg-white shadow w-[80%] mx-auto overflow-hidden mt-4">
        <div className="container flex flex-start p-6 lg:ml-4  text-gray-600 capitalize dark:text-gray-300">
          <a
            className={`text-gray-800 cursor-pointer  border-b-2 mx-1.5 sm:mx-6 ${
              showDescription ? "border-blue-500" : "border-transparent"
            }`}
            onClick={toggleDescription}
          >
            Description
          </a>
          <a
            className={`border-b-2  text-gray-800 cursor-pointer mx-1.5 sm:mx-6 ${
              showDescription ? "border-transparent" : "border-blue-500"
            }`}
            onClick={toggleSpecification}
          >
            Specification
          </a>
        </div>
          <div className="p-6 mt-4 lg:ml-4 text-gray-600 dark:text-gray-500">
            {showDescription ? (
              <div className="lg:ml-4">
                <h2 className="text-2xl font-semibold ">Description</h2>
                <p>Insert your description text here.</p>
              </div>
            ) : (
              <div className="lg:ml-4">
                <h2 className="text-2xl  font-semibold">Specification</h2>
                <p>Insert your specification text here.</p>
              </div>
            )}
          </div>
        </section>

    </div>
  );
};

export default ProductDetails;
