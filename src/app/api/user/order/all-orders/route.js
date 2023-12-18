import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import Order from "@/backend/model/Order";
import isOauth from "@/backend/middlewere/isOauth";

export async function GET(request) {
    await connectDB();
    try {
        const check = await isOauth(request);

        if (!check._id) {
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        }
        const userID = check._id;
        const orders = await Order.find({ user: userID }).populate({
            path: "user"
          }).sort({ createdAt: -1 });

        if (!orders) {
            return NextResponse.json({ success: false, message: "Order Not Found" }, { status: 400 });
        }
        const lenOrder = orders.length;
        return NextResponse.json({ success: true, length:lenOrder ,message: "Order Found", data: orders }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}