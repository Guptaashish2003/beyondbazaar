"use client";
import React, { useState } from "react";
import DeliveryOptions from "@/components/PaymentPageTools/DiliveryOptions";
import PaymentOptions from "@/components/PaymentPageTools/PaymentOptions";
import CreditCardInput from "@/components/PaymentPageTools/CreditCardInput";
import UpiInput from "@/components/PaymentPageTools/UpiInput";
import OrderSummary from "@/components/OrderStatus/OrderTools/OrderSummary";

const PaymentPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (Dtitle) => {
    setSelectedOption(Dtitle);
  };
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  console.log(selectedPaymentOption);

  return (
    <div className="w-11/12 flex justify-between gap-4 lg:mt-48 max-md:w-11/12 mx-auto">
      <div className="w-1/2 bg-slate-100">
      <h1 className="font-bold my-4 px-4  text-xl ">Order Summary:</h1>
        <OrderSummary />
        <OrderSummary />
        <OrderSummary />
        <div className="flex flex-col  p-4">
          <div className="flex justify-between">
          <p className="text-base text-black font-bold">Shipping </p>
          <p className="text-base text-black font-bold">₹ 92</p>
          </div>   
          <div className="flex justify-between">         
          <p className="text-base text-black font-bold">Total </p>
          <p className="text-base text-black font-bold">₹ 999</p>
          </div>
        </div>


      </div>
      
      <div className= " w-1/2 ">
        <h1 className="font-bold  text-base">Delivery method</h1>
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
