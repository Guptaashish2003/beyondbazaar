"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiFastForward } from "react-icons/fi";
import SocialMedial from "@/components/SocialMediaIcons/SocialMedial";
import SubmitButton from "../Form/SubmitButton";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/action/Services";
import { useRouter, usePathname } from "next/navigation";

const ProductDes = ({
  BaseUrl,
  id,
  category,
  slug,
  title,
  price,
  metaDescription,
  stock,
  className,
  variants,
  isVariantAvailable=false
}) => {
  const pathName = usePathname();
  const router = useRouter();
  const [productCount, setProductCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState();
  const [variantDetails, setVariantDetails] = useState([]);
  const [variantData, setVariantData] = useState();
  const dispatch = useDispatch();
  // console.log(variant, "variantsdetilasss", variantData);
  useEffect(() => {
    if (variants) {
      setVariant(variants[0]?._id);
      setVariantDetails(variants[0]?.variantDetails);
      setVariantData(variants[0]?.variantDetails[0]);
    }
  }, [variants]);
  const increment = () => {
    if(isVariantAvailable){
      if (variantData.stock > productCount) {
        setProductCount(productCount + 1);
      } else {
        toast.warn("Out Of Stock", { autoClose: 2000 });
      }
    }else{
      if (stock > productCount) {
        setProductCount(productCount + 1);
      } else {
        toast.warn("Out Of Stock", { autoClose: 2000 });
      }
    }
  };
  const decrement = () => {
    if (productCount > 0) {
      setProductCount(productCount - 1);
    } else {
      toast.warn("somthing was wrong!", { autoClose: 2000 });
    }
  };
  const addToCartProduct = async () => {
    setLoading(true);
    if (variant && variantData) {
      dispatch(
        addToCart({
          productID: id,
          productQuantity: productCount,
          variantId: variant,
          variantDetailId: variantData?._id,
          isVariantAvailable:true
        })
      );
    } else {
      dispatch(
        addToCart({
          productID: id,
          productQuantity: productCount,
        })
      );
    }
    setLoading(false);
  };
  const orderNow = async () => {
    if (variant && variantData) {
      router.push(
        `/checkout/${slug}?qty=${productCount}&variant=${variant}&variantDetails=${variantData?._id}`
      );
    } else {
      router.push(`/checkout/${slug}?qty=${productCount}`);
    }
  };

  return (
    <div className={`p-8   w-1/2 max-lg:w-full ${className}`}>
      <div className="  my-2 text-bold mr-4">
        <h1 className="title max-lg:text-xl text-2xl capitalize my-1 font-bold max-lg:text-center">
          {title || "Samsung curved display"}
        </h1>
        <p className="para text-start text-base ">
          {metaDescription ||
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem odioerror ullam optio quod corporis"}
        </p>
        <span className="inline-block my-2 text-[--first-color] font-bold text-xl cursor-text max-lg:my-2">
          {variantData?.price ? (
            <p className="border-b-2 inline border-slate-400 border-solid ">
              {variantData?.price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              }) || 2999}
            </p>
          ) : (
            <p className="border-b-2 inline border-slate-400 border-solid ">
              {price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              }) || 2999}
            </p>
          )}
        </span>
        <hr className="mt-8 border border-slate-200" />
      </div>
      <div className=" flex max:lg:text-lg text-black max-lg:gap-2 gap-4 items-center container  py-4 ">
        <p>Quantity:</p>
        <div className="flex border-2 border-solid border-slate-300 text-2xl">
          <button onClick={decrement} className="px-4 py-1">
            -
          </button>
          <span className="px-4 py-1"> {productCount} </span>
          <button onClick={increment} className="px-4 py-1">
            +
          </button>
        </div>
      </div>
      {isVariantAvailable && (
        <div className="flex max:lg:text-lg text-black max-lg:gap-2 gap-4 items-center container  py-4">
          <p>Size:</p>
          <div className="flex gap-2">
            {variants.map((vart, index) => (
              <input
                type="button"
                disabled={vart?.stock === 0}
                key={vart?._id}
                className={`${
                  variant === vart?._id
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                } w-10 h-10 text-lg text-center cursor-pointer`}
                value={vart?.variantType}
                onClick={() => {
                  setVariant(vart?._id);
                  setVariantDetails(vart?.variantDetails);
                  setVariantData(vart.variantDetails[0]);
                }}
              />
            ))}
          </div>

          {variantDetails[0]?.color && (
            <div className="flex max:lg:text-lg text-black max-lg:gap-2 gap-4 items-center container ">
              <p>Color:</p>
              <div className="flex gap-2">
                {variantDetails.map((vart, index) => (
                  <input
                    type="button"
                    key={vart?._id}
                    className={`${
                      variantData === vart
                        ? "bg-black text-white"
                        : "bg-gray-200 text-black"
                    } w-20 h-10 text-lg text-center cursor-pointer`}
                    value={vart?.color}
                    onClick={() => {
                      setVariantData(vart);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <SubmitButton
        loading={loading}
        className="my-4 max-lg:my-2 font-bold cartAnimation w-11/12 h-12  border-2 border-solid border-slate-400 text-xl overflow-hidden"
        value={"Add To Cart"}
        onClick={addToCartProduct}
      >
        <AiOutlineShoppingCart className="cartmotion w-6 h-auto" />
      </SubmitButton>
      <SubmitButton
        className="my-4 font-bold max-lg:my-2 orderBounce w-11/12 h-12  border-2 border-solid border-slate-400 text-xl bg-black text-white"
        value={"Order Now"}
        onClick={orderNow}
      >
        <FiFastForward className="arrowAnime w-6 h-auto" />
      </SubmitButton>

      <div className="flex gap-5 ">
        <span className="text-xl"> share:</span>
        <SocialMedial
          hover={"hover:text-black"}
          className="gap-4 text-xl"
          facebook={`https://www.facebook.com/sharer/sharer.php?u=${BaseUrl}/${pathName}`}
          instagram={`https://www.instagram.com/?url=${BaseUrl}/${pathName}`}
          twitter={`http://www.twitter.com/share?url=${BaseUrl}/${pathName}`}
          linkedin={` http://www.linkedin.com/shareArticle?mini=true&url=${BaseUrl}/${pathName}`}
          whatsApp={`https://api.whatsapp.com/send?text=${BaseUrl}/${pathName}`}
        />
      </div>
    </div>
  );
};

export default ProductDes;
