import React from 'react';
import { GrRadialSelected } from 'react-icons/gr';

const DeliveryOptions = ({ Dtitle, days, charges, isSelected, onClick }) => {
  return (
    <div className='w-1/2'>
      <div
        className={`border-2 border-gray-400 p-2 flex rounded-md flex-col focus:border-black cursor-pointer relative ${
          isSelected ? 'border-black' : ''
        }`}
        tabIndex="0"
        onClick={onClick}
      >
        <p className='font-bold text-sm'>{Dtitle}</p>
        <p>{days}</p>
        <p className='mt-6'>{charges}</p>
        {isSelected && (
          <div className="absolute top-2 right-2 text-green-500">
            <GrRadialSelected />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryOptions;
