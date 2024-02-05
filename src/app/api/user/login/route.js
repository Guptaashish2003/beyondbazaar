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
        message: "Invalid email or password",
      },{status: 400});
    }
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return  NextResponse.json({
        message: "Invalid email or password",
      },{status: 400});
    }
    const PasswordMatch = await user.matchPassword(password);
    if (!PasswordMatch) {
      return NextResponse.json({
        message: "Invalid email or password",
      },{status: 400});
    }
    // return NextResponse.json({name:"nnnn",data: "user"}, { status: 200});
    return await jwtToken(user, 200, "Login Success", request);
    
  } catch (error) {
    return  NextResponse.json({
      message: error.message,
    },{status: 400});
  }
}
