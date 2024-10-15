import Image from "next/image";
import React from "react";

const PreviewImage = ({ preImage }) => {
  return (
    <div className=" min-w-20 flex  gap-2 justify-center flex-wrap max-h-36 border">
      {preImage?.map((itm, index) => (
        <div
          key={index}
          onClick={() =>  navigator.clipboard.writeText(itm)}
          className="relative w-24 h-36 cursor-pointer"
        >
          <div className="w-full h-full absolute top-0 left-0 hover:bg-[#0000006d] hover:text-white text-transparent  flex justify-center items-center text-4xl z-10">
            <span>{index}</span>
          </div>
          <Image
            src={itm}
            width={300}
            height={400}
            alt="img"
            className="object-contain hover:bg-black h-full w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default PreviewImage;
