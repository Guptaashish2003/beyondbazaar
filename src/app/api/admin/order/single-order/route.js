import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import Order from "@/backend/model/Order";

//get single order

export async function GET(request, context) {
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
        const id = context.params.id;
        const order = await Order.findById(id);
        return NextResponse.json({ success: true, data: order }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
        );
    }
}