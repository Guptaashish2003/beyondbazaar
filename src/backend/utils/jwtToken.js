'use server'
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

const jwtToken = async (user, statusCode, msg) => {
  const token = await user.getSignedToken();
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    secure: false,
    
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  let Response = NextResponse.json(
    {
      success: true,
      message: msg,
      token,
      data: user,
    },
    {
      status: statusCode,
    }
  );
  console.log(cookieOptions.expires)
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    path: '/',
    expires: cookieOptions.expires,
  })

  
  return Response;
};

export default jwtToken;
