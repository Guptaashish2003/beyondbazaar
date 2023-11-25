import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";

//getuserdata

export async function GET(request) {
  await connectDB();

  try {
     const check =  await isOauth(request); 
      if (!check._id) {
        return NextResponse.json(
          { success: false, message: "User Not Found" },
          { status: 400 }
        );
      }
      const addres = request.user.address;
     return NextResponse.json({ success:true ,message: "all address",data:addres }, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
