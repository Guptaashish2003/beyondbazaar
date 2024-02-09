import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import Order from "@/backend/model/Order";
import isOauth from "@/backend/middlewere/isOauth";
import Cart from "@/backend/model/Cart";
import Product from "@/backend/model/Product";
import Promocode from "@/backend/model/Promocode";
import { calculateDiscount } from "@/app/api/apply-promo/route";



export async function POST(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const userID = check._id;
        const data = await request.json();
        let {  orderItems, shippingInfo, shippingPrice,discount,method } = data;

        if (!orderItems || !shippingInfo || !shippingPrice|| !method ) {
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }

        let itemsPrice;
        let product;
        if(method === "bycart") {
          const cart = await Cart.find({ userID:check._id }).populate("productID", "productPrice productQuantity");
           itemsPrice = cart.reduce((acc, curr) =>{
            return acc + curr.productID.productPrice * curr.productQuantity;
         
         },0)
        }
        else if(method === "byproduct") {
          product = await Product.findById(orderItems[0].product);
          itemsPrice = product.productPrice * Number(orderItems[0].qty);
        }
        else {
          return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        let discountValue = 0
        let promocodeDoc
        if(discount){
            promocodeDoc = await Promocode.findById(discount)
            discountValue = calculateDiscount(promocodeDoc.discountType,promocodeDoc.discountValue,itemsPrice,promocodeDoc.maxDiscount);
        }
        const taxPrice = itemsPrice * 0.18;
        const totalPrice = itemsPrice + taxPrice + shippingPrice - discountValue
        shippingInfo = check.address.filter((val)=>{return val._id.valueOf() === shippingInfo})
        const order = await Order.create({ user:userID, orderItems, shippingInfo:shippingInfo[0], itemsPrice, taxPrice, shippingPrice, totalPrice,discount });
        if(!order){
            return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 400 });
        }

        if(discount && check.role !== 'admin'){
            promocodeDoc.userRestriction.push(check._id)
            await promocodeDoc.save()
        }
        if(method === 'bycart'){
         await Cart.findOneAndDelete({userID:check._id})
        }
        return NextResponse.json({ success: true, message: "Order Created", data: order }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}