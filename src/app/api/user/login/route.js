import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import User from "@/backend/model/User";
import jwtToken from "@/backend/utils/jwtToken";

await connectDB();

export async function POST(request) {
    try {
        const data = await request.json();
        const {
        email,
        password,
        } = data;
        
        if(!email && !password ){
            return new NextResponse({
              status: 400,
              statusText: "Invalid email or password",
            });

        }
        const user = await User.findOne({ email: email }).select("+password");    
        if(!user){
            return new NextResponse({
              status: 400,
              statusText: "Invalid email or password",
            });
        }
        console.log("gfhgghgyuyyfyj",user)
        const PasswordMatch = await user.matchPassword(password);
        if(!PasswordMatch){
            return new NextResponse({
              status: 400,
              statusText: "Invalid email or password",
            });
        }
        return NextResponse.json({name:"nnnn",data: user}, { status: 200});

        jwtToken(user, 200, "Login Success", NextResponse);

        
    } catch (error) {
      console.log(error)
        return new NextResponse({
          status: 400,
          message: error.message,
        });
        
    }
}