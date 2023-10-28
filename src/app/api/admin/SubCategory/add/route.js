import SubCategory from "@/backend/model/SubCategory";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
//creating a new Subcategory by admin


export async function POST(request) {
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
        const data = await request.json();
        console.log(data, "data")

        const { category,SubCategoryName,SubCategoryImage,SubCategoryDescription ,SubCategorySlug } = data;

        if (!SubCategoryName || !SubCategoryImage || !SubCategoryDescription ) {
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