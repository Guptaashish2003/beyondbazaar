import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import User from "@/backend/model/User";
import { Session } from "next-auth";
export async function PUT(request) {
    await connectDB();
    //user seting first time password
   try {
    const { email, password } = await request.json();
    console.log(",,,,,,,,,,,,,,,,,,,",email, password)
    const user = await User.findOne({
        email: email,
    });
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    user.password = password;
    user.byGooglePass = false;
    await user.save();
    return NextResponse.json({ message: "Password set successfully" }, { status: 200 });

    
   } catch (error) {
    
   }
}