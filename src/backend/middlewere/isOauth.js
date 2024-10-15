import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import User from "@/backend/model/User";
import { cookies } from "next/headers";

const isOauth = async req => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || "";
    if (!token || token === "null" || token === "undefined") {
      return NextResponse.json(
        { success: false, message: "You are not Authorized please login again" },
        { status: 400 }
      );
    }
    const decoded =  jwt.verify(token,process.env.JWT_SECRET_KEY )
   
    if (!decoded ) {
      return NextResponse.json(
        { success: false, message:"Invalid Token , You are not Authorized and DeAuthorized"  },
        { status: 400 }
      );
    }
    
    const user = await User.findOne({ _id: decoded.id })

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User Not Found or Login again" },
        { status: 400 }
        );
      }
      
      req.user = user
    return user
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

export default isOauth
