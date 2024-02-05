import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import Order from "@/backend/model/Order";
import isOauth from "@/backend/middlewere/isOauth";


export async function POST(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const userID = check._id;
        const data = await request.json();
        // const {  orderItems, shippingInfo, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = data;
        let {  orderItems, shippingInfo, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice,discount } = data;
        // if (!orderItems || !shippingInfo || !paymentInfo || !itemsPrice || !taxPrice || !shippingPrice || !totalPrice) {
        //     return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        // }
        taxPrice = totalPrice * 0.18;
        shippingInfo = check.address.filter((val)=>{return val._id.valueOf() === shippingInfo})
        const order = await Order.create({ user:userID, orderItems, shippingInfo:shippingInfo[0], paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice,discount });
        return NextResponse.json({ success: true, message: "Order Created", data: order }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}