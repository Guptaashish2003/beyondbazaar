import ProductReview from "@/backend/model/ProductReview";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"
import isOauth from "@/backend/middlewere/isOauth";

export async function DELETE(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const { productReviewId } = request.body;
        if (!productReviewId) {
            return NextResponse.json({ success: false, message: "Please Provide All Fields" }, { status: 400 });
        }
        const deleteProductReview = await ProductReview.findByIdAndDelete(productReviewId);
        if (!deleteProductReview) {
            return NextResponse.json({ success: false, message: "Product Review Not Deleted" }, { status: 400 });
        }
        return NextResponse.json({ success: true, message: "Product Review Deleted", data: deleteProductReview }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}