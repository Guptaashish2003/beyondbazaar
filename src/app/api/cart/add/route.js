import Cart from "@/backend/model/Cart";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
import Product from "@/backend/model/Product";

export async function POST(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const userID = check._id;
        const data = await request.json();
        const {  productID, productQuantity,variantId,variantDetailId,isVariantAvailable } = data;
        if (!productID || !productQuantity) {
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        const productStock = await Product.findById({_id:productID}).select("productQuantity variants")
        if (productQuantity > productStock.productQuantity) {
            return NextResponse.json({ success: false, message: `limited stock not more than ${productStock.productQuantity}` }, { status: 400 });
        }
        if (variantId && variantDetailId && productStock.variants.length > 0) {
            let variantStock = 0;
            const variant = productStock.variants.map((item) =>{
                if(item._id.toString() === variantId.toString()){
                    return item.variantDetails.map((item2) =>{
                        if(item2._id.toString() === variantDetailId.toString()){
                            variantStock = item2.stock;
                            return item2
                        }
                    })
                }
            });
            if (productQuantity > variantStock) {
                return NextResponse.json({ success: false, message: `limited stock not more than ${variantStock}` }, { status: 400 });
            }
        }

        const updateQuantity = await Cart.find({ userID, productID})
        if (updateQuantity.length > 0) {
            updateQuantity[0].productQuantity = productQuantity;
            await updateQuantity[0].save()
            return NextResponse.json({ success: true, message: "update Quantity successfully", data: updateQuantity }, { status: 200 });  
        }
        const cart = await Cart.create({ userID, productID, productQuantity,variantId,variantDetailId,isVariantAvailable });
        console.log(cart)
        return NextResponse.json({ success: true, message: "Added to cart", data: cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}