import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import User from "@/backend/model/User";

const isOauth = async req => {
  console.log("jkhkdfkljskksdfirst")
  try {
    const token = await req.headers.get("Authorization")?.split(" ")[1]
    console.log("togfgfhgfhken",token)
    if (!token) {
      return NextResponse.json(
        { success: false, message: error.message && "You are not Authorized or token is expired"},
        { status: 400 }
      );
    }
    const decoded =  jwt.verify(token,process.env.JWT_SECRET_KEY )
    console.log("decoded",decoded) 
    if (!decoded) {
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
      console.log("user in auth",user)
    return user
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

export default isOauth
