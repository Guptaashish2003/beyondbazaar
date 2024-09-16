import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import Order from "@/backend/model/Order";
import isOauth from "@/backend/middlewere/isOauth";

export async function GET(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check 
        }
        const userID = check._id;
        const orders = await Order.find({ user: userID }).populate({
            path: 'orderItems',
            populate: [
              {
                path: 'product',
                select: 'productName productImage slug productPrice',
              },
            ],
          }).sort({ createdAt: -1 }).select(["_id","orderItems"]);
        let newOrder = orders.map((val)=>{
           return val.orderItems.map((inside)=>{return ({...inside._doc,mainId:val._id})})
        })
        newOrder = newOrder.flat();
       // console.log(newOrder,"orders...")

        if (!orders) {
            return NextResponse.json({ success: false, message: "Order Not Found" }, { status: 400 });
        }
        const lenOrder = orders.length;
        return NextResponse.json({ success: true, length:lenOrder ,message: "Order Found", data: newOrder }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}