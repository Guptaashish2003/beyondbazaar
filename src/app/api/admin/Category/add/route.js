import Category from "@/backend/model/Category";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
//creating a new category by admin


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
        const { categoryName,categoryImage } = data;
        console.log(categoryName, categoryImage)
        if (!categoryName || !categoryImage ) {
            return NextResponse.json({ success: false, message: "Invalid Input" }, { status: 400 });
        }
        const category = await Category.create({
            categoryName,
            categoryImage,
        });
        return NextResponse.json({ success: true, data: category }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
   
}