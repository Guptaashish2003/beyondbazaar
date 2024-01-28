import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import Order from "@/backend/model/Order";

//update order

export async function PUT(request, context) {
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
        const { status,orderId } = await request.json();
        const order = await Order.findById(id);
        order.orderItems.filter((item) =>{
            if(item._id.valueOf() === orderId){
                item.status = status;
            }
        });
        order.save();
        return NextResponse.json(
        { success: true, message: "Updated successfully" },
        { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
        );
    }
}