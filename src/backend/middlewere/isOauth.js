import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import User from "@/backend/model/User";

const isOauth = async req => {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1]
    console.log("token",token)
    if (!token) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
    const decoded =  jwt.verify(token,process.env.JWT_SECRET_KEY )
    console.log("decoded",decoded) 
    if (!decoded) {
      return NextResponse.json(
        { success: false, message:"Invalid Token , You are not Authorized"  },
        { status: 400 }
      );
    }
    
    const user = await User.findOne({ _id: decoded.id })
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User Not Found" },
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
