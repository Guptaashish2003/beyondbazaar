import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
import User from "@/backend/model/User";
//getuserdata

export async function PUT(request, context) {
  await connectDB();

  try {
    const  check  = await isOauth(request);
    if (!check._id) {
        return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
    }
    const data = await request.json();
    const id = context.params.id;
    const {name,street,city,state,zip,phoneNo} = data
    const user = await User.findById(check._id);
    const edit = user.address.map(data=>{
      if (data._id.valueOf() === id) {
        return {name,street,city,state,zip,phoneNo}
      }
      else{
        return data;
      }
    })
    user.address = edit;
    await user.save();
     return NextResponse.json({ sucess:true ,message: "address updated successfully",data:user.address }, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
