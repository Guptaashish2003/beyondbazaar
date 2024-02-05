import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import User from "@/backend/model/User";
import isOauth from "@/backend/middlewere/isOauth";

export async function PUT(request) {
  await connectDB();
  try {
    const check = await isOauth(request);
    if (!check._id) {
        return check
    }
    const data = await request.json();
    const { current_password,confirm_password } = data;
    if (!confirm_password || !current_password) {
      return NextResponse.json(
        { success: false, message: "Invalid Input" },
        { status: 400 }
      );
    }   
    const user = await User.findById(check._id).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User Not Found" },
        { status: 400 }
      );
    }
    const matchPassword = user.matchPassword(current_password);
    if (!matchPassword) {
      return NextResponse.json(
        { success: false, message: "password not match" },
        { status: 400 }
      );
    }
    user.password = confirm_password;
    user.save();
    return NextResponse.json(
      { success: true, message: "Updated-successfully", data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
