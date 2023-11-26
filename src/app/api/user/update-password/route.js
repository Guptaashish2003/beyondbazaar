import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import User from "@/backend/model/User";
import isOauth from "@/backend/middlewere/isOauth";

export async function PUT(request) {
  await connectDB();
  try {
    const check = await isOauth(request);
    if (!check._id) {
      return NextResponse.json(
        { success: false, message: "User Not Found" },
        { status: 400 }
      );
    }
    const data = await request.json();
    const { password } = data;
    if (!password) {
      return NextResponse.json(
        { success: false, message: "Invalid Input" },
        { status: 400 }
      );
    }   
    const user = await User.findOne({ _id: check._id }).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User Not Found" },
        { status: 400 }
      );
    }
    user.password = password;
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
