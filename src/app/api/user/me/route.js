import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
 
//getuserdata

export async function GET(request, context) {
  await connectDB();

  try {
     const check =  await isOauth(request);
      const user = request.user;    
      if (!check._id) {
          return check
      }
     return NextResponse.json({ success:true ,message: "get-login-data-successfully",data:user }, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
