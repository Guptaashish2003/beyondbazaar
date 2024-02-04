import ProductReview from "@/backend/model/ProductReview";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";

export async function GET(request, context) {
  await connectDB();
  try {
    const id = await context.params.id;
    const reviews = await ProductReview.find({ productId: id });
    let averageRating = 0;

    if (!reviews || reviews.length === 0) {
      console.log("No reviews found for this product");
    } else {
      let totalRating = 0;
      reviews.forEach((review) => {
        totalRating += review.rating;
      });
      averageRating = totalRating / reviews.length;
      console.log("id", id);
      console.log("averageRating", averageRating);
    }


    const fiveStar = await ProductReview.countDocuments({
      productId: id,
      rating: 5,
    });
    const fourStar = await ProductReview.countDocuments({
      productId: id,
      rating: 4,
    });
    const threeStar = await ProductReview.countDocuments({
      productId: id,
      rating: 3,
    });
    const twoStar = await ProductReview.countDocuments({
      productId: id,
      rating: 2,
    });
    const oneStar = await ProductReview.countDocuments({
      productId: id,
      rating: 1,
    });
    const totalReview = await ProductReview.countDocuments({ productId: id });
    const data = {
      averageRating,
      fiveStar,
      fourStar,
      threeStar,
      twoStar,
      oneStar,
      totalReview,
    };

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Please Provide All Fields" },
        { status: 400 }
      );
    }
    const allProductReview = await ProductReview.find({ productId: id })
      .populate("userId", "name ")
      .sort("-rating");

    return NextResponse.json(
      {
        success: true,
        message: "Product Review Found",
        data: allProductReview,...data
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
