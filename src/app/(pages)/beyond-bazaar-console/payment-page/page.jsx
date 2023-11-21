"use client";
import React, { useState } from "react";
import DeliveryOptions from "@/components/PaymentPageTools/DiliveryOptions";
import PaymentOptions from "@/components/PaymentPageTools/PaymentOptions";
import CreditCardInput from "@/components/PaymentPageTools/CreditCardInput";
import UpiInput from "@/components/PaymentPageTools/UpiInput";

const PaymentPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (Dtitle) => {
    setSelectedOption(Dtitle);
  };
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  console.log(selectedPaymentOption);

  return (
    <div className="w-1/2 max-md:w-11/12 mx-auto">
      <h1 className="font-bold my-4 text-base">Delivery method</h1>
      <section className="flex flex-wrap gap-1">
        <DeliveryOptions
          Dtitle={"Standard Delivery"}
          days={"5-7 days"}
          charges={"₹100"}
          isSelected={selectedOption === "Standard Delivery"}
          onClick={() => handleOptionClick("Standard Delivery")}
        />
        <DeliveryOptions
          Dtitle={"Express Delivery"}
          days={"2-3 days"}
          charges={"₹200"}
          isSelected={selectedOption === "Express Delivery"}
          onClick={() => handleOptionClick("Express Delivery")}
        />
      </section>
      <hr className="my-3 w-11/12 border border-slate-200" />
      <h1 className="font-bold my-4 text-base">Payment method</h1>
      <div className="w-11/12">
        <section className="flex gap-1 justify-between">
          <PaymentOptions
            paymentOptions="UPI"
            setSelectedPaymentOption={setSelectedPaymentOption}
          />
          <PaymentOptions
            paymentOptions="Credit/Debit Card"
            setSelectedPaymentOption={setSelectedPaymentOption}
          />
          <PaymentOptions
            paymentOptions="Net Banking"
            setSelectedPaymentOption={setSelectedPaymentOption}
          />
        </section>
      </div>
      {selectedPaymentOption === "Credit/Debit Card" && <CreditCardInput />}
      {selectedPaymentOption === "UPI" && (
        <div className="w-11/12">
          <UpiInput />
        </div>
        )}
      {selectedPaymentOption === "Net Banking" && (
         <div className="inline-flex items-center my-12 w-full justify-center">
         <button
           type="submit"
           className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 rounded"
         >
           Proceed To Pay
         </button>
       </div>
      )}

    </div>
  );
};

export default PaymentPage;
