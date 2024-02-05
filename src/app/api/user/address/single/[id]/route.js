import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
import User from "@/backend/model/User";
//getuserdata

export async function GET(request,context) {
  await connectDB();

  try {
      const check = await isOauth(request);
      if (!check._id) {
          return check
      }
      const id = context.params.id;
      const addres = request.user.address;
      const single = addres.filter(ads=>ads._id.valueOf() === id);
      if(single.length === 0) {
        return NextResponse.json(
            { success: false, message: "address not found" },
            { status: 400 }
         );
      }
     return NextResponse.json({ success:true ,message: "single address",data:single }, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
