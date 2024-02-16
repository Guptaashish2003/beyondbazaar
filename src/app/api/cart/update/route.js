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
            return check
        }
        const userID = check._id;
        const data = await request.json();
        const { cartItemId, productQuantity } = data;
        if (!cartItemId || !productQuantity) {
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        const cart = await Cart.findOneAndUpdate({ userID, _id :cartItemId }, { productQuantity }, { new: true });
        const productStock = await Product.findById({_id:cart.productID}).select("productQuantity")
        // console.log(productStock,"productQuantityproductQuantity")
        if (productQuantity > productStock?.productQuantity) {
            return NextResponse.json({ success: false, message: `limited stock not more than ${productStock.productQuantity}` }, { status: 400 });
        }
        const myCart = await Cart.find({ userID:check._id }).populate("productID", "productPrice productQuantity");
         const cartQuantity = myCart.length;
         const totalquantity = myCart.reduce((acc, curr) => {
            return acc + curr.productQuantity;
         },0)
         const totalprice = myCart.reduce((acc, curr) =>{
            return acc + curr.productID.productPrice * curr.productQuantity;
         
         },0)
        return NextResponse.json({ success: true, message: "Updated cart",quantity:cartQuantity,totalquantity,totalprice, data: cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}