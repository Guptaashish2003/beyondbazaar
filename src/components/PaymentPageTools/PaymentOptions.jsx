import React from 'react'

const PaymentOptions = ({ paymentOptions, setSelectedPaymentOption }) => {
  const handleOptionChange = () => {
    setSelectedPaymentOption(paymentOptions);
  };

  return (
    <div className="flex items-center pl-3">
      <input
        id="horizontal-list-radio-id"
        type="radio"
        defaultValue=""
        name="list-radio"
        className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 focus:bg-gray-900 dark:focus:black"
        onChange={handleOptionChange}
      />
      <label
        htmlFor="horizontal-list-radio-id"
        className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
      >
        {paymentOptions}
      </label>
    </div>
  );
};

export default PaymentOptions;
