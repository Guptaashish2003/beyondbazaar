import ProductReview from "@/backend/model/ProductReview";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"
import isOauth from "@/backend/middlewere/isOauth";

export async function POST(request) {
    await connectDB();
    try {
        const userOauth = await isOauth(request);
        const { productId,title,  description, rating } = await request.json();
        console.log(productId,title,  description, rating )
        if (!productId || !title || !description ) {
            return NextResponse.json({ success: false, message: "Please Provide All Fields" }, { status: 400 });
        }
        const userId = userOauth._id

        if (!userOauth) {
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        }
        
        //do one user can give review to one product only once
        const newProductReview = new ProductReview({
            productId,
            userId,
            title,
            description,
            rating
        });
        const saveProductReview = await newProductReview.save();
        if (!saveProductReview) {
            return NextResponse.json({ success: false, message: "Product Review Not Saved" }, { status: 400 });
        }
        return NextResponse.json({ success: true, message: "Product Review Saved", data: saveProductReview }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}