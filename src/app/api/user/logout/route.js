import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
 
//getuserdata

export async function GET(request, context) {
  await connectDB();

  try {
     const check =  await isOauth(request);
    //  console.log(check)
    
     const response = NextResponse.json({ success:true ,message: "logout-successfully"}, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
