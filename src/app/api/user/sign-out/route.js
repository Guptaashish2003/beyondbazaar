import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
import { cookies } from 'next/headers'
//getuserdata

export async function GET(request, context) {
  await connectDB();

  try {
    const check = await isOauth(request);
    const cookieStore = cookies();
    cookieStore.getAll().forEach((cookie) => {
      cookieStore.delete(cookie.name);
    });

    return NextResponse.json({ success: true, message: "logout-successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );

  }
}
