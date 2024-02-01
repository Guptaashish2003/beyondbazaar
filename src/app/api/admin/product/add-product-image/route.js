import Product from "@/backend/model/Product";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
import { imageUpload } from "@/backend/utils/fireBaseImageCrud";

export async function POST(request) {
    console.log("lkdsjlk;sajdflkasjedfl")
    await connectDB();
    try {
        const user = await isOauth(request);
        if (!user) {
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        }
        const role = outhRoles(["admin"], request);
        if (!role) {
            return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
        }
        const formData = await request.formData();
        console.log(formData, "formData")
        const url = await imageUpload(formData, "products");

        
        return NextResponse.json({ success: true, data: url, mesage: "add successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}