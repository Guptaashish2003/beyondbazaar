"use client"
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";

const ProductDetails = () => {
  const router = useRouter();
  const [showDescription, setShowDescription] = useState(true);

  const toggleDescription = () => {
    setShowDescription(true);
  };

  const toggleSpecification = () => {
    setShowDescription(false);
  };
  const sigout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/"); // Redirect to the dashboard page after signing out
  });
  }
  

  return (
    <div className="lg:mt-[--nav-spc] mt-12">
      <hr className="mt-12 border border-slate-500 mx-auto w-[80%]" />
      <section className="bg-white shadow w-[80%] mx-auto overflow-hidden mt-4">
        <div className="container flex justify-center gap-4 p-6 lg:ml-4  text-gray-600 capitalize dark:text-gray-300">
          <a
            className={`text-gray-800 cursor-pointer  border-b-2 mx-1.5 sm:mx-6 ${
              showDescription ? "border-black-300" : "border-transparent"
            }`}
            onClick={toggleDescription}
          >
            Orders
          </a>
          <a
            className={`border-b-2  text-gray-800 cursor-pointer mx-1.5 sm:mx-6 ${
              showDescription ? "border-transparent" : "border-black-300"
            }`}
            onClick={toggleSpecification}
          >
            Addresses
          </a>
          <a
            className={` text-gray-800 cursor-pointer mx-1.5 sm:mx-6 `}
            onClick={sigout}
          >
            Logout
          </a>
        </div>
          <div className="p-6 mt-4 lg:ml-4 text-[--first-color] dark:text-gray-500">
            {showDescription ? (
              <div className="lg:ml-4">
                <h2 className="text-2xl font-semibold text-[--first-color]">Description</h2>
                <p>Insert your description text here.</p>
                <div className="mt-2 text-base">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis nulla dolor distinctio soluta, debitis ullam! Placeat deserunt totam a animi soluta explicabo eius maiores quis voluptate iste accusamus, veniam iusto quos sit minima error? Consequuntur exercitationem saepe id porro sed, sapiente vero quia, natus laborum culpa nobis laudantium quidem nulla vel dolore similique veritatis dignissimos assumenda consectetur laboriosam maxime totam numquam. Suscipit eius possimus architecto accusantium ea asperiores animi unde error tempora.
                </div>
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
