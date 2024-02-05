import ProductReview from "@/backend/model/ProductReview";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"
import isOauth from "@/backend/middlewere/isOauth";
import { outhRoles } from "@/backend/middlewere/outhRoles";

export async function POST(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const { productId,title,  description, rating } = await request.json();
        
        const reviewFind = await ProductReview.findOne({ productId, userId: check._id });
        //admin can do multipe review
        if (check.role !== "admin") {

            if (reviewFind) {
                return NextResponse.json({ success: false, message: "You have already given review to this product" }, { status: 400 });
            }
        }
       
        if (!productId || !title || !description ) {
            return NextResponse.json({ success: false, message: "Please Provide All Fields" }, { status: 400 });
        }
        const userId = check._id

        if (!check) {
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