import Category from "@/backend/model/Category";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";


// deleting a new category by admin

export async function DELETE(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const role =  outhRoles(["admin"], request);
        if (!role) {
            return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
        }
        const data = await request.json();
        const { _id } = data;
        if (!_id) {
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        const category = await Category.findByIdAndDelete(_id);
        return NextResponse.json({ success: true, data: category }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}