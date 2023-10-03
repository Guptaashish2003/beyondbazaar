import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
const PriceCheckOut = () => {
  return (
    <section className="flex  max-sm:w-10/12 mt-3 flex-col bg-gray-300 max-sm:w-full justify-start lg:w- border-solid border-slate-400 border-2 h-full p-4 mx-5">
      <p className="py-1"> Enter Promo Code</p>
      <div className="flex justify-between  py-2 gap-1">
        <input type="text" placeholder="Promo Code" className="w-2/3 p-2" />
        <button
          type="button"
          className="text-white w-1/3 hover:scale-105 duration-300 cursor-pointer bg-black"
        >
          Apply
        </button>
      </div>
      <div class="flex gap-2 flex-col">
        <div class="flex justify-between">
          <p>Shipping Cost</p>
          <p>40</p>
        </div>

        <div class="flex justify-between">
          <p>Discount</p>
          <p>40</p>
        </div>

        <div class="flex justify-between">
          <p>Tax</p>
          <p>18%</p>
        </div>

        <div class="flex justify-between font-bold py-2 text-xl">
          <p>Estimated Total</p>
          <p>40</p>
        </div>
      </div>

      <a className="relative  cursor-pointer inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-black border-2 border-gray-600 rounded-md hover:text-white group hover:bg-gray-50">
        <span className="absolute left-0 block w-full h-0 transition-all bg-gray-800 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease" />
        <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
          <AiOutlineShoppingCart className="w-6 h-auto" />
        </span>
        <span className="relative m-auto">Proceed to Buy</span>
      </a>
    </section>
  );
};

export default PriceCheckOut;
