import Cart from "@/backend/model/Cart";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";


export async function DELETE(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        }
        const userID = check._id;
        const data = await request.json();
        const { productID } = data;
        const cart = await Cart.findOneAndDelete({  _id:productID,userID });
        return NextResponse.json({ success: true, message: "Deleted from cart", data: cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

}