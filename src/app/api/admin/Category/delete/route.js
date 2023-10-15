import Category from "@/backend/model/Category";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection

// deleting a new category by admin

export async function DELETE(request) {
    await connectDB();
    try {
        const data = await request.json();
        const { _id } = data;
        const category = await Category.findByIdAndDelete(_id);
        return NextResponse.json({ success: true, data: category }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}