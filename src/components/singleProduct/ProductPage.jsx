import React from "react";
import ProductPhotos from "./ProductPhotos";
import ProductDes from "./ProductDes";
import ProductDetails from "./ProductDetails";

const ProductPage = () => {
  return (
    <>
      <div className="flex  justify-center flex-wrap  p-4">
        <ProductPhotos />
        <ProductDes />
      </div>
        <ProductDetails />
    </>
  );
};

export default ProductPage;
