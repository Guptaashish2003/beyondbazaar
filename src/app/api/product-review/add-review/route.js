import ProductReview from "@backend/model/ProductReview";
import { NextResponse } from "next/server";
import connectDB from "@backend/DATABASE/ConnectDB"
import { outhRoles } from "@backend/middlewere/outhRoles";
import isOauth from "@backend/middlewere/isOauth";

export async function POST(request) {
    await connectDB();
    try {
        const { product, user, review,photos, rating } = request.body;
        if (!product || !user || !review || !rating) {
            return NextResponse.json({ success: false, message: "Please Provide All Fields" }, { status: 400 });
        }
        const userOauth = await isOauth(request);
        if (!userOauth) {
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        }
        const role = outhRoles(["user"], request);
        if (!role) {
            return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
        }
        //do one user can give review to one product only once
        const newProductReview = new ProductReview({
            product,
            user,
            review,
            photos,
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