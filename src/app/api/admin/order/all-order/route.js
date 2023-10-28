import Order from "@/backend/model/Order";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";

export async function GET(request) {
    await connectDB();
    try {
        const  user  = await isOauth(request);
        if (!user) {
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        }
        const role =  outhRoles(["admin"], request);
        if (!role) {
            return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
        }
        
        const orders = await Order.find({}).sort({ createdAt: -1 });
        if (!orders) {
            return NextResponse.json({ success: false, message: "Order Not Found" }, { status: 400 });
        }
        const lenOrder = orders.length;
        return NextResponse.json({ success: true, length: lenOrder, message: "Order Found", data: orders }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}