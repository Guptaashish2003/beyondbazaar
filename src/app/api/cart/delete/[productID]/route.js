import Cart from "@/backend/model/Cart";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";


export async function DELETE(request,context) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const userID = check._id;
        const productID = context.params.productID;
        if (!productID) {
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        console.log(productID)
        const cart = await Cart.findOneAndDelete({  _id:productID,userID });
        const myCart = await Cart.find({ userID:check._id }).populate("productID", "productPrice productQuantity");
        const cartQuantity = myCart.length;
        const totalquantity = myCart.reduce((acc, curr) => {
           return acc + curr.productQuantity;
        },0)
        const totalprice = myCart.reduce((acc, curr) =>{
           return acc + curr.productID.productPrice * curr.productQuantity;
        
        },0)
        return NextResponse.json({ success: true, message: "Deleted from cart",quantity:cartQuantity,totalquantity,totalprice, data: cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

}