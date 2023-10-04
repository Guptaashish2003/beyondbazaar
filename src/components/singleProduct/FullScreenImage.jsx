import React from 'react';
import Image from 'next/image';
const FullScreenImage = ({ src, alt, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen mt-16 h-screen bg-opacity-70 bg-black flex justify-center items-center z-50">
      <div className="relative max-w-full max-h-full">
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          onClick={onClose}
        />
        <button
          className="absolute top-4 right-4 bg-white text-gray-800 px-2 py-1 rounded-lg shadow-md hover:bg-gray-200 hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FullScreenImage;
