import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
import User from "@/backend/model/User";
//getuserdata

export async function POST(request, context) {
  await connectDB();

  try {
    const  check  = await isOauth(request);
    if (!check._id) {
        return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
    }
    const data = await request.json();
    const {name,email,street,city,state,pincode,country,number,District} = data
    console.log(data)
    const user = await User.findById(check._id);
    user.address.push({name,email,street,city,state,country,pincode,number,District});
    await user.save({ validateBeforeSave: false });
     return NextResponse.json({ success:true ,message: "address added successfully",data:user.address }, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
