import Cart from "@/backend/model/Cart";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
export async function GET(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        }
        const userID = check._id;
        const cart = await Cart.find({ userID }).populate("productID", "productName productPrice productImage productQuantity");
         const cartQuantity = cart.length;
        return NextResponse.json({ success: true,quantity:cartQuantity, message: "Cart", data: cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}