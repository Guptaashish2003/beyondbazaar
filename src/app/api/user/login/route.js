import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import User from "@/backend/model/User";
import jwtToken from "@/backend/utils/jwtToken";

await connectDB();

export async function POST(request,response) {
  try {
    const data = await request.json();
    const { email, password } = data;
    
    if (!email && !password) {
      return new NextResponse({
        status: 400,
        statusText: "Invalid email or password",
      });
    }
    const user = await User.findOne({ email: email }).select("+password");
    console.log(user);
    if (!user) {
      
      return  NextResponse.json({
        status: 400,
        statusText: "Invalid email or password",
      });
    }
    console.log(data);
    const PasswordMatch = await user.matchPassword(password);
    if (!PasswordMatch) {
      return NextResponse.json({
        status: 400,
        statusText: "Invalid email or password",
      });
    }
    // return NextResponse.json({name:"nnnn",data: "user"}, { status: 200});
    return await jwtToken(user, 200, "Login Success", request);


    
  } catch (error) {
    console.log(error);
    return  NextResponse.json({
      status: 400,
      message: error.message,
    });
  }
}
