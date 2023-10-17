import SubCategory from "@/backend/model/SubCategory";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection

// deleting a new Subcategory by admin

export async function DELETE(request) {
    await connectDB();
    try {
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