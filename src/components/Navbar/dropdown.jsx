"use client"
import React, { useState } from 'react';

const DropdownNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div>
        <button
          type="button"
          className="px-4 py-2 font-semibold text-gray-800 hover:text-gray-900 focus:outline-none focus:ring focus:ring-gray-300"
        >
          Dropdown
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0  w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Item 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Item 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Item 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownNav;


