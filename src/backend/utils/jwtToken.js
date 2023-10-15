import { NextResponse } from "next/server";

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
  Response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    maxAge: cookieOptions.expires, // 1 week
  });
  return Response;
};

export default jwtToken;
