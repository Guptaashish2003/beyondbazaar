import React from "react";
import InputBtn from "./InputBtn";
import SubmitButton from "./SubmitButton";

const Content = ({ title, description, btnName }) => {
  return (
    <>
      <div className=" mx-auto w-full flex justify-between items-center p-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-black text-lg" >{title}</h1>
          <p className="text-gray-800">{description}</p>
        </div>
        <div className="border rounded-md border-gray-600 w-16">{btnName}</div>
      </div>
      <hr className="mt-4 border border-slate-500 mx-auto " />
    </>
  );
};

export default Content;
