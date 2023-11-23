import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
import User from "@/backend/model/User";
//getuserdata

export async function PUT(request, context) {
  await connectDB();

  try {
    const  check  = await isOauth(request);
    if (!check) {
        return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
    }
    const data = await request.json();
    const id = context.params.id;
    const {name,street,city,state,zip,phoneNo} = data
    const user = await User.findById(check._id);
    const edit = user.address.filter(address=>{
      if (address._id === id) {
        return {...address,name,street,city,state,zip,phoneNo }
      }
      
    })
    console.log("user",edit)
    await user.save();
     return NextResponse.json({ sucess:true ,message: "address updated successfully",data:user.address }, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
