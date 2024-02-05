import ProductReview from "@/backend/model/ProductReview";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"
import isOauth from "@/backend/middlewere/isOauth";


export async function POST(request, context) {
    await connectDB();
    try {
        const reviewId = await context.params.id;
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const { productId,  title, description ,rating } = await request.json();
        if(!reviewId || !productId || !title || !description || !rating){
            return NextResponse.json({ success: false, message: "Please Provide All Fields" }, { status: 400 });
        }
        const ProductReviewFind = await ProductReview.findOne({ _id:reviewId, userId: user._id });
        if (!ProductReviewFind) {
            return NextResponse.json({ success: false, message: "Product Review Not Found" }, { status: 400 });
        }
        ProductReviewFind.title = title;
        ProductReviewFind.description = description;
        ProductReviewFind.rating = rating;
        const saveProductReview = await ProductReviewFind.save();
        if (!saveProductReview) {
            return NextResponse.json({ success: false, message: "Product Review Not Saved" }, { status: 400 });
        }
        return NextResponse.json({ success: true, message: "Product Review Updated", data: saveProductReview }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}
