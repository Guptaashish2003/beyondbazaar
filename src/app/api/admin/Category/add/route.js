import Category from "@/backend/model/Category";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
//creating a new category by admin


export async function POST(request) {
    await connectDB();
    try {
        const data = await request.json();
        const { categoryName,categoryImage,categoryDescription ,categorySlug } = data;
        const category = await Category.create({
            categoryName,
            categoryImage,
            categoryDescription,
            categorySlug
        });
        return NextResponse.json({ success: true, data: category }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
   
}