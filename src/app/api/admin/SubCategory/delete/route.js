import SubCategory from "@/backend/model/SubCategory";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
// deleting a new Subcategory by admin

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
        const Subcategory = await SubCategory.findByIdAndDelete(_id);
        return NextResponse.json({ success: true, data: Subcategory }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}