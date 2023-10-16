import SubCategory from "@/backend/model/SubCategory";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection

// updating a new Subcategory by admin

export async function PUT(request) {
    await connectDB();
    try {
        console.log(data, "data")
        const { category,_id, SubcategoryName, SubcategoryImage, SubcategoryDescription, SubcategorySlug } = data;
        if (!SubcategoryName || !SubcategoryImage || !SubcategoryDescription || !SubcategorySlug) {
            return NextResponse.json({ success: false, message: "Please fill all the fields" }, { status: 400 });
        }
        const Subcategory = await SubCategory.findByIdAndUpdate(_id, {
            SubcategoryName,
            SubcategoryImage,
            SubcategoryDescription,
            SubcategorySlug,
            category
        });
        console.log(Subcategory, "Subcategory")
        return NextResponse.json({ success: true,message:"Upadat-successfully", data: Subcategory }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}