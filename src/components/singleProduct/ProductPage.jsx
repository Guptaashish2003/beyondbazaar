import React from "react";
import ProductPhotos from "./ProductPhotos";
import ProductDes from "./ProductDes";
import ProductDetails from "./ProductDetails";
import ProductReview from "./ProductReview";

const ProductPage = () => {
  return (
    <>
      <div className="flex  justify-center flex-wrap  p-4">
        <ProductPhotos />
        <ProductDes />
      </div>
        <ProductDetails />
        <ProductReview />

    </>
  );
};

export default ProductPage;
