import React from "react";

const ProductDes = ({ children, title, para }) => {
  return (
    <div className="mt-32">
      {children}
      <h1 className="title text-4xl uppercase font-bold text-black">{title}</h1>
      <p className="para text-center mt-6 text-xl">{para}</p>
    </div>
  );
};

export default ProductDes;
