import SubmitButton from "@/components/Form/SubmitButton";
import ProductDes from "@/components/singleProduct/ProductDes";
import ProductDetails from "@/components/singleProduct/ProductDetails";
import ProductPhotos from "@/components/singleProduct/ProductPhotos";
import ProductReview from "@/components/singleProduct/ProductReview";
import ReviewTestimonial from "@/components/singleProduct/ReviewTestimonial";
import { useGetData } from "@/redux/api/useGetData";
import { notFound } from "next/navigation";
import React from "react";

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
  }
}

const page = async ({ params }) => {
  const { slug } = params;
  const { data, success } = await useGetData(`/api/product/single-product/${slug}`);
  if (!success) {
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
          BaseUrl={process.env.baseURL}
          className="min-h-96"
          id={data._id}
          slug={data.slug}
          title={data.productName}
          discription={data.productDescription}
          price={data.productPrice}
          stock={data.productQuantity}
          category={data?.productCategory.category.categoryName}
        />
      </div>
      <ProductDetails />
     { reviewData.data.length > 0 && <section className="mt-10 flex  max-w-[90%] max-md:flex-col mx-auto gap-x-4">
        <ProductReview className="mb-4" reviewData={reviewData} />
        <ReviewTestimonial id={data._id} reviewData={reviewData.data} />
      </section>}
    </>
  );
};

export default page;
