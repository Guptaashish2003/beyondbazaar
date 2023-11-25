import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
import User from "@/backend/model/User";
//getuserdata

export async function DELETE(request, context) {
  await connectDB();

  try {
    const  check  = await isOauth(request);
    if (!check._id) {
        return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
    }
    const id = context.params.id;
    const user = await User.findById(check._id);
    const del = user.address.filter(address=>{ return address._id.valueOf() !== id})
    user.address = del;
    await user.save({ validateBeforeSave: false });
     return NextResponse.json({ success:true ,message: "address deleted successfully",data:user.address }, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
