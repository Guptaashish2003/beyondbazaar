import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import Order from "@/backend/model/Order";
import isOauth from "@/backend/middlewere/isOauth";

export async function POST(request) {
    await connectDB();
    try {
        const check = await isOauth(request);

        if (!check._id) {
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        }
        const userID = check._id;
        const {slug} = await request.json();
        if(!slug){
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        const orders = await Order.find({ user: userID ,slug });
        if (!orders||orders.length===0) {
            return NextResponse.json({ success: false, message: "Order Not Found" }, { status: 400 });
        }
        return NextResponse.json({ success: true, message: "Order Found", data: orders }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}