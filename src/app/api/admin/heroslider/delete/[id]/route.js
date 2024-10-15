import heroSlide from "@/backend/model/heroSlide";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
import { imageUpload } from "@/backend/utils/fireBaseImageCrud";
import { deleteImage } from "@/backend/utils/deleteImage";
//creating a new category by admin


export async function DELETE(request,context) {
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
        const id = context.params.id;
        const img = await heroSlide.findById(id);
    
        if (!img) {
            return NextResponse.json({ success: false, message: "Image Not Found" }, { status: 400 });
        }
        // console.log(img.heroImage,"img.heroImage")
        const delte = await deleteImage(img.heroImage);

        return NextResponse.json({ success: true, data: delte }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
   
}