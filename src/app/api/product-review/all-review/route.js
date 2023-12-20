import ProductReview from "@/backend/model/ProductReview";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"

export async function GET(request) {
    await connectDB();
    try {
        const { product } = request.query;
        if (!product) {
            return NextResponse.json({ success: false, message: "Please Provide All Fields" }, { status: 400 });
        }
        const allProductReview = await ProductReview.find({ product }).populate("user");
        if (!allProductReview) {
            return NextResponse.json({ success: false, message: "Product Review Not Found" }, { status: 400 });
        }
        return NextResponse.json({ success: true, message: "Product Review Found", data: allProductReview }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}