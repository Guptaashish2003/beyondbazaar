"use client"
import React, { useState } from "react";
import { content } from "tailwindcss/defaultTheme";

const ProductDetails = ({description}) => {
  const [showDescription, setShowDescription] = useState(true);

  const toggleDescription = () => {
    setShowDescription(true);
  };

  const toggleSpecification = () => {
    setShowDescription(false);
  }; 
  // console.log(description)
  const content = JSON.parse(description)

  return (
    <div>
      <hr className="mt-12 border border-slate-500 mx-auto w-[80%]" />
      <section className="bg-white shadow w-[80%] mx-auto overflow-hidden mt-4">
        <div className="container flex flex-start p-6 lg:ml-4  text-gray-600 capitalize dark:text-gray-300">
          {/* <h2
            className={`text-gray-800 text-lg cursor-pointer  border-b-2 mx-1.5 sm:mx-6 ${
              showDescription ? "border-blue-500" : "border-transparent"
            }`}
            onClick={toggleDescription}
          >
            Description
          </h2> */}
          {/* <a
            className={`border-b-2  text-gray-800 cursor-pointer mx-1.5 sm:mx-6 ${
              showDescription ? "border-transparent" : "border-blue-500"
            }`}
            onClick={toggleSpecification}
          >
            Specification
          </a> */}
        </div>
          <div className="p-2 lg:ml-4 text-[--first-color] dark:text-gray-500">
            {showDescription ? (
              <div className="lg:ml-4">

                <div className='tiptap !h-max !border-none' dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            ) : (
              <div className="lg:ml-4">
                <h2 className="text-2xl  font-semibold text-[--first-color]">Specification</h2>
                <p>Insert your specification text here.</p>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, magni? Rerum, assumenda. Necessitatibus eum eligendi, fugit ex libero, maiores recusandae tempore repellat eius placeat autem voluptatibus nisi dolore saepe odit exercitationem nesciunt sed. At illum voluptatem vitae placeat, animi totam. Enim in debitis libero ex ipsam molestias dolore sint id eos molestiae impedit, aspernatur quia rem ratione dolorem optio quidem tempora nihil pariatur. Eum impedit officiis similique vel officia nesciunt facere quisquam.</div>
              </div>
            )}
          </div>
        </section>

    </div>
  );
};

export default ProductDetails;
