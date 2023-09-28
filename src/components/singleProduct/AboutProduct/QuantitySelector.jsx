"use client";

import React ,{ useState } from 'react';

const QuantitySelector = ()=> {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2 border-4">
      <button
        className="px-2 py-1  text-gray rounded hover:text-black"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <span className="text-lg font-bold">{quantity}</span>
      <button
        className="px-2 py-1  text-gray rounded hover:text-black"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
