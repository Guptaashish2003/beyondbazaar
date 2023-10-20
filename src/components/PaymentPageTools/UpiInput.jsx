import React, { useState } from "react";

const UpiInput = () => {
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  // An array of banks for the dropdown menu

  const banks = [
    "apl",
    "yapl",
    "upi",
    "boi",
    "dlb",
    "indus",
    "pnb",
    "sbi",
    "dbs",
    "fam",
    "okhdfcbank",
    "okaxis",
    "okicici",
    "yesg",
    "fbl",
    "icici",
    "jupiteraxis",
    "ikwik",
    "jio",
    "axb",
    "paytm",
    "pz",
    "ybl\nibl\naxl",
    "icici",
    "sliceaxis",
    "tapicici",
    "zoicici",
  ];

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <label htmlFor="upiId" className="block text-gray-600 font-bold mb-2">
          Enter UPI ID:
        </label>
        <input
          type="text"
          id="upiId"
          value={upiId}
          className="w-[80%] bg-gray-100  text-gray-800 border rounded py-1 px-3"
        />
      </div>
        <span className="inline-flex items-end w-full justify-end">
          <button
            type="submit"
            className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </span>
    </div>
  );
};

export default UpiInput;
