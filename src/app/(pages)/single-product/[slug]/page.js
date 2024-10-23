import SubmitButton from "@/components/Form/SubmitButton";
import ProductDes from "@/components/singleProduct/ProductDes";
import ProductDetails from "@/components/singleProduct/ProductDetails";
import ProductPhotos from "@/components/singleProduct/ProductPhotos";
import ProductReview from "@/components/singleProduct/ProductReview";
import ReviewTestimonial from "@/components/singleProduct/ReviewTestimonial";
import { useGetData } from "@/redux/api/useGetData";
import src from "@tiptap/extension-link";
import { url } from "inspector";
import image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { width, height } from "tailwindcss/defaultTheme";
import { images } from "../../../../../next.config";
import { alt } from "./opengraph-image";

export async function generateMetadata({ params }) {
  const { data,success } = await useGetData(`/api/product/single-product/${params.slug}?fields=seo`);
  if (!success)
  return {
    title: "Not Found",
    description: "The page is not found",
  };
  let title
  let description
  if(!data?.seo){
    title = params.slug
    description = params.slug
  }else{
    title = data.seo.title
    description = data.seo.description
  }
  return {
    title: title,
    description:description ,
    alternates: {
      canonical: `/${params.slug}`,
    },
    openGraph: {
        images: [{
          url: product.data.data.productImage[0],
          alt: product.data.data.productImage[0],
          width: 1200,
          height: 630,
        }],
      },
  }
}

const page = async ({ params }) => {
  const { slug } = params;
  const { data, success } = await useGetData(`/api/product/single-product/${slug}`);
  // console.log(data,"data..")
  if (!success ||data === null) {
    return notFound();
  }
  const reviewData = await useGetData(
    `/api/product-review/all-review/${data._id}`
  );
  return (
    <>
      <div className="flex  justify-center flex-wrap  p-4 navMargin minScreen">
        <ProductPhotos img={data.productImage} />
        <ProductDes
          BaseUrl={process.env.BASEURL}
          className="min-h-96"
          id={data._id}
          slug={data.slug}
          title={data.productName}
          productAvailable= {data.productAvailable}
          metaDescription={data.seo?.description}
          price={data.productPrice}
          stock={data.productQuantity}
          category={data?.productCategory.category.categoryName}
          variants={data?.variants}
          isVariantAvailable={data?.isVariantAvailable}
        />
      </div>
      <ProductDetails
       description={data?.productDescription}
        />
     { reviewData.data.length > 0 && <section className="mt-10 flex  max-w-[90%] max-md:flex-col mx-auto gap-x-4">
        <ProductReview className="mb-4" reviewData={reviewData} />
        <ReviewTestimonial id={data._id} reviewData={reviewData.data} />
      </section>}
    </>
  );
};

export default page;
