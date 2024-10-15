// ImageUploadModal.tsx

import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "@/components/Modal/Modal";
import { UploadButton } from "@/backend/utils/uploadthing";
import { uploadImage } from "@/components/Admin/uploadImage";
import { TiImage } from "react-icons/ti";
const ImageUploadModal = ({
  preImage,
  setPreImage,
  open,
  onClose,
  button,
  heroImageRef,
  additionalWork,
}) => {
  const [dialogRef, setDialogRef] = useState(null);
  const [method, setMethod] = useState("uploadthing");
  const [imageU, setImageU] = useState(null);

  useEffect(() => {
    const path = "product";
    imageU && uploadImage(path, imageU, preImage,setPreImage,);

  }, [imageU]);
  const onChange = (e) => {
    setMethod(e.target.value);
  };
  console.log("preview image...", preImage);
  return (
    <Modal
      open={open}
      onClose={onClose}
      setDialog={setDialogRef}
      btnClass="w-full"
      className="!px-20 "
      btnName={button}
    >
      <div className="flex justify-center gap-x-4 mx-auto my-6">
        <label>
          <input
            type="radio"
            name="method"
            value="uploadthing"
            checked={method === "uploadthing"}
            onChange={onChange}
            className="mx-2"
          />
          uploadthing
        </label>
        <label>
          <input
            type="radio"
            name="method"
            id="firebase"
            value="firebase"
            checked={method === "firebase"}
            onChange={onChange}
            className="mx-2"
          />
          firebase
        </label>
        <label>
          <input
            type="radio"
            name="method"
            value="url"
            checked={method === "url"}
            onChange={onChange}
            className="mx-2"
          />
          url
        </label>
      </div>
      {method === "uploadthing" && (
        <UploadButton
          endpoint="imageUploader"
          className="w-full bg-black text-white"

          onClientUploadComplete={(res) => {
            setPreImage([...preImage,res[0].url]);
            if (additionalWork) {
              additionalWork?.(res[0].url);
            }
            dialogRef?.current?.close();
          }}
          onUploadError={(error) => {
            dialogRef?.current?.close();
            toast.error(error.message);
          }}
        />
      )}
      {method === "firebase" && (
        <div className="relative w-[90%] h-36 rounded-lg shadow-inner border-1 my-2 mx-auto">
          <input
            type="file"
            id="file-upload"
            onChange={(e) => {
              console.log("file", e.target.files[0]);
              setImageU(e.target.files[0]);
            }}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
          >
            <p className="z-10 text-xs font-light text-center text-gray-500">
              Drag &amp; Drop your files here
            </p>
            <TiImage width={"12px"} />
          </label>
        </div>
      )}
      {method === "url" && (
        <div>
          <input
            type="url"
            ref={heroImageRef}
            placeholder="using URL..."
            className="w-[70%] px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          />
          <button
            className="py-2 px-4 bg-black text-white rounded-md my-2"
            onClick={() => {
              if (heroImageRef.current?.value) {
                setPreImage([...preImage,heroImageRef.current.value]);
                if (additionalWork) {
                  additionalWork?.(
                    heroImageRef.current.value,
                  );
                }
              } else {
                toast.error("url not found");
              }
              dialogRef?.current?.close();
            }}
          >
            add image...
          </button>
        </div>
      )}
    </Modal>
  );
};

export default ImageUploadModal;
