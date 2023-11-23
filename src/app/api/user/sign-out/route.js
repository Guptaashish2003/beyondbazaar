import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
import { cookies } from 'next/headers'
//getuserdata

export async function GET(request, context) {
  await connectDB();

  try {
     const check =  await isOauth(request);
    if(!check){
        return NextResponse.json({ success:true ,message: "user not found" }, { status: 400 });
    }
    cookies().delete('token')
     return NextResponse.json({ success:true ,message: "logout-successfully" }, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
