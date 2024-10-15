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
        const { cartItemId, productQuantity, variantId, variantDetailId, isVariantAvailable } = data;
        if (!cartItemId || !productQuantity) {
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        const product = await Cart.find({ userID: check._id, _id: cartItemId }).populate("productID", "productPrice productQuantity variants");
        if (productQuantity > product.productID?.productQuantity) {
            return NextResponse.json({ success: false, message: `limited stock not more than ${product.productID.productQuantity}` }, { status: 400 });
        }
        if (variantId && variantDetailId && product.productID.variants.length > 0) {
            let variantStock = 0;
            product.productID.variants.map((item) => {
                if (item._id.toString() === variantId.toString()) {
                    return item.variantDetails.map((item2) => {
                        if (item2._id.toString() === variantDetailId.toString()) {
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
        const cart = await Cart.findOneAndUpdate({ userID, _id: cartItemId }, { productQuantity }, { new: true });
        const myCart = await Cart.find({ userID: check._id }).populate("productID", "productPrice productQuantity variants");

        const cartQuantity = myCart.length;
        const totalquantity = myCart.reduce((acc, curr) => {
            return acc + curr.productQuantity;
        }, 0)
        const totalprice = myCart.reduce((acc, curr) => {
            if (curr.isVariantAvailable) {
                let variantPrice = 0;
                curr.productID.variants.map((item) => {
                    if (item._id.toString() === curr.variantId.toString()) {
                        return item.variantDetails.map((item2) => {
                            if (item2._id.toString() === curr.variantDetailId.toString()) {
                                variantPrice = item2.price;
                                return item2
                            }
                        })
                    }
                });
                return acc + (variantPrice * curr.productQuantity);
            } else {
                return acc + (curr.productID.productPrice * curr.productQuantity);
            }
        }, 0);

        return NextResponse.json({ success: true, message: "Updated cart", quantity: cartQuantity, totalquantity, totalprice, data: cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}