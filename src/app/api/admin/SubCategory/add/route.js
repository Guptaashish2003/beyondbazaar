import SubCategory from "@/backend/model/SubCategory";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
//creating a new Subcategory by admin


export async function POST(request) {
    await connectDB();
    try {
        const data = await request.json();
        console.log(data, "data")

        const { category,SubCategoryName,SubCategoryImage,SubCategoryDescription ,SubCategorySlug } = data;

        if (!SubCategoryName || !SubCategoryImage || !SubCategoryDescription || !SubCategorySlug) {
            return NextResponse.json({ success: false, message: "Please fill all the fields" }, { status: 400 });
        }
        const Subcategory = await SubCategory.create({
            SubCategoryName,
            SubCategoryImage,
            SubCategoryDescription,
            SubCategorySlug,
            category
        });
        console.log(Subcategory, "Subcategory")
        return NextResponse.json({ success: true,message:"Sub created successfully", data: Subcategory }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
   
}