import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import User from "@/backend/model/User";

//update User

export async function GET(request, context) {
  await connectDB();

  try {
      // const data = await request.json();
      const id = context.params.id;
      
      const user = await User.findById({_id:id});
    
     return NextResponse.json({ sucess:true ,message: "Updated-successfully",data:user }, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
