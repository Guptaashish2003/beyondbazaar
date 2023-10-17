import Cart from "@/backend/model/Cart";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
import Product from "@/backend/model/Product";

export async function PUT(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        }
        const userID = check._id;
        const data = await request.json();
        const { productID, productQuantity } = data;
        if (!productID || !productQuantity) {
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        const cart = await Cart.findOneAndUpdate({ userID, _id :productID }, { productQuantity }, { new: true });
        const productStock = await Product.findById({_id:cart.productID}).select("productQuantity")
        console.log(productStock,"productQuantityproductQuantity")
        if (productQuantity > productStock?.productQuantity) {
            return NextResponse.json({ success: false, message: `limited stock not more than ${productStock.productQuantity}` }, { status: 400 });
        }
        return NextResponse.json({ success: true, message: "Updated cart", data: cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}