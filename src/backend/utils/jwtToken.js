import {cookies} from "next/headers"
import { NextResponse } from "next/server";


const jwtToken = (user, statusCode,msg, res) => {
    
    const token = user.getSignedToken()
    res.status(statusCode).json({ success: true, token })
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }
    if (process.env.NODE_ENV === "production") {
        cookieOptions.secure = true
    }
    
    cookies().set("token", token, cookieOptions)
    console.log('first')
    res.json({ success: true,data:user, token,message:msg },{status:statusCode})
    

}

export default jwtToken;