import React from "react";
import ProductPhotos from "./ProductPhotos";
import ProductDes from "./AboutProduct/ProductDes";
import { LiaRupeeSignSolid } from "react-icons/lia";

const ProductPage = () => {
  return (
    <>
      <div className="flex justify-center text-center  ">
        <ProductPhotos />
        <ProductDes />
      </div>
    </>
  );
};

export default ProductPage;
