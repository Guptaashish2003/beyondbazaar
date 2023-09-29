import React from "react";
import ProductPhotos from "./ProductPhotos";
import ProductDes from "./AboutProduct/ProductDes";
import ProductDetails from "./AboutProduct/ProductDetails";

const ProductPage = () => {
  return (
    <>
      <div className="flex justify-center  max-[1090px]:flex-col p-4">
        <ProductPhotos />
        <ProductDes />
      </div>
        <ProductDetails />
    </>
  );
};

export default ProductPage;
