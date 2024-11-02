import { NextResponse } from "next/server";
import { cookies } from "next/headers";



//creating a new subCategory by 
export async function GET(request) {
    try {
        const cookie = cookies().set({
            name: "val",
            value: 'userToken',
            httpOnly: true,
            path: "/",
          });
          console.log(cookie);
          if (!cookie) {
            return NextResponse.json({ success: false, message: "Token not found" }, { status: 400 });
          }
          return NextResponse.json({ success: true, message: "Token found" }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
        
    }
}