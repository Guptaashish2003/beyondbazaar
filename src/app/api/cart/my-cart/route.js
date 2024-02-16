import Cart from "@/backend/model/Cart";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
export async function GET(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const userID = check._id;
        const cart = await Cart.find({ userID }).populate("productID", "productName productPrice productImage productQuantity");
         const cartQuantity = cart.length;
         const totalquantity = cart.reduce((acc, curr) => {
            return acc + curr.productQuantity;
         },0)
         const totalprice = cart.reduce((acc, curr) =>{
            return acc + curr.productID.productPrice * curr.productQuantity;
         
         },0)
        return NextResponse.json({ success: true,quantity:cartQuantity,totalquantity,totalprice, message: "Cart", data: cart }, { status: 200 });
    } catch (error) {
        // console.log(error.message)
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}