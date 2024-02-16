import SubCategory from "@/backend/model/SubCategory";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";

// updating a new Subcategory by admin

export async function PUT(request) {
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
        // console.log(Subcategory, "Subcategory")
        return NextResponse.json({ success: true,message:"Upadat-successfully", data: Subcategory }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}