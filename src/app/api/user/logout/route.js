import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import { cookies } from 'next/headers'
//getuserdata

export async function GET(request, context) {
  await connectDB();

  try {
      cookies().delete('token')
     const response = NextResponse.json({ success:true ,message: "logout-successfully"}, { status: 200 });
     return response;
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
