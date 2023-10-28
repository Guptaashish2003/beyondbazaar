import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import User from "@/backend/model/User";


export async function POST(request) {
    await connectDB();
    
    try {
        const data = await request.json();
        const {
        email,
        password,
        name,
        } = data;
        if (!email || !password || !name) {
            return new NextResponse({
              status: 400,
              statusText: "Invalid Input",
            });
        }
      

        // if (!isMatch(password, "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")) {
        //     return new NextResponse({
        //       status: 400,
        //       statusText: "Invalid password",
        //     });
        // }
        // if(!isMatch(email, "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")) {
        //     return new NextResponse({
        //       status: 400,
        //       statusText: "Invalid email",
        //     });
        // }

        const user = await User.create({
        email,
        password,
        name,
        });
        console.log(user)
    
        return NextResponse.json({ success: true,message:"user-Created", data: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            console.log(error),

        { success: false, message: error.message },
        { status: 400 }
        );
    }

}