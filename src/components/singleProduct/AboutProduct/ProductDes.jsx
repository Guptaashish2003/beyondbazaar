import React  from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import QuantitySelector from "./QuantitySelector";


const ProductDes = () => {
  return (
    <div className=" mt-40   ">
      <div className="  ml-4 text-bold mr-4">
        <h1 className="title text-4xl uppercase font-bold text-black">
          Samsung curved display
        </h1>
        <p className="para text-center mt-6 text-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem odio
          eaque error ullam optio quod corporis.
        </p>
        <hr className="mt-8 border border-slate-500" />
        <p className="flex flex-start gap-4 mt-4 text-black text-3xl cursor-text ">
          <LiaRupeeSignSolid /> 2999
        </p>
        <hr className="mt-8 border border-slate-500" />
      </div>
        <div className="mt-4 flex text-2xl gap-4 container mx-auto p-4 ">
          <p>Quantity:</p>
          <QuantitySelector />
        </div>
      </div>
  );
};

export default ProductDes;
