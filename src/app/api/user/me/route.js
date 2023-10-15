import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
 
//getuserdata

export async function GET(request, context) {
  await connectDB();

  try {
     const check =  await isOauth(request);
    //  console.log(check)
      const user = request.user;    
      if (!check._id) {
        return NextResponse.json(
          { success: false, message: "User Not Found" },
          { status: 400 }
        );
      }
     return NextResponse.json({ sucess:true ,message: "get-login-data-successfully",data:user }, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
