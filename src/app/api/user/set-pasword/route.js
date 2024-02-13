import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import User from "@/backend/model/User";
import isOauth from "@/backend/middlewere/isOauth";

export async function PUT(request) {
    await connectDB();
    //user seting first time password
    try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const data = await request.json();
        const { password,confirm_password } = data;
        if (!confirm_password || !password) {
            return NextResponse.json(
                { success: false, message: "Invalid Input" },
                { status: 400 }
            );
        }   
        const user = await User.create({password})
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User Not Found" },
                { status: 400 }
            );
        }
      
        //create feilds for first time password setting
      

        
            
        
    } catch (error) {
        
    }
}