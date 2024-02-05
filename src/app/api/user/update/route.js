import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import User from "@/backend/model/User";
import isOauth from "@/backend/middlewere/isOauth";


//update user
export async function PUT(request) {
    await connectDB();
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const data = await request.json();
        const {name, email,address,phoneNo} = data;
        const user = await User.findByIdAndUpdate(check._id, {name, email,address,phoneNo});

        return NextResponse.json({ success:true ,message: "Updated-successfully",data:user }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
        
    }
}