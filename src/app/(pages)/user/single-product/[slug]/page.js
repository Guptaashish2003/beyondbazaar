import SubmitButton from "@/components/Form/SubmitButton";
import ProductDes from "@/components/singleProduct/ProductDes";
import ProductDetails from "@/components/singleProduct/ProductDetails";
import ProductPhotos from "@/components/singleProduct/ProductPhotos";
import ProductReview from "@/components/singleProduct/ProductReview";
import ReviewTestimonial from "@/components/singleProduct/ReviewTestimonial";
import { useGetData } from "@/redux/api/useGetData";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }) => {
  // notFound()
  const { slug } = params;
  const { data, success } = await useGetData(`/product/single-product/${slug}`);
  if (!data) {
    return notFound();
  }

  const reviewData = await useGetData(
    `/product-review/all-review/${data._id}`
  );
  console.log(reviewData);

  return (
    <>
      <div className="flex  justify-center flex-wrap  p-4 lg:mt-[--nav-spc] mt-12">
        <ProductPhotos img={data.productImage} />
        <ProductDes
          className="min-h-96"
          id={data._id}
          slug={data.slug}
          title={data.productName}
          discription={data.productDescription}
          price={data.productPrice}
          stock={data.productQuantity}
        />
      </div>
      <ProductDetails />
      <section className="mt-10 flex  max-w-[90%] max-md:flex-col mx-auto gap-x-4">
        <ProductReview className="mb-4" reviewData={reviewData} />
        <ReviewTestimonial id={data._id} reviewData={reviewData.data} />
      </section>
    </>
  );
};

export default page;
