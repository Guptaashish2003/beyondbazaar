import heroSlide from "@/backend/model/heroSlide";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
import { imageUpload } from "@/backend/utils/imageUpload";
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
        const formData = await request.formData();
        const url = await imageUpload(formData, "heroSlider");
        console.log("urlurlurlurlurl",url)
        const hero = await heroSlide.create({ heroImage: url });
        return NextResponse.json({ success: true, data: hero,mesage:"add successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
   
}