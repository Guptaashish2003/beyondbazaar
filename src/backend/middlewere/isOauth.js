import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import User from "../models/userModel.js"


export const dynamic = "force-dynamic"

const AuthCheck = async req => {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY ?? "default_secret_dumbScret"
    )
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
    return NextResponse.next()
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

export default AuthCheck
