import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import isOauth from "@/backend/middlewere/isOauth";
import User from "@/backend/model/User";
//getuserdata

export async function POST(request, context) {
  await connectDB();

  try {
    const check = await isOauth(request);
    if (!check._id) {
        return check
    }
    const data = await request.json();
    const {name,email,houseNo,street,city,state,pincode,country,phNumber,District} = data
    if(!name || !email || !houseNo || !street || !city || !state || !pincode || !country || !phNumber || !District){
      return NextResponse.json({ success: false, message: "Please fill all the fields" }, { status: 400 });
    }
    const user = await User.findById(check._id);
    user.address.push({name,email,houseNo,street,city,state,country,pincode,phNumber,District});
    await user.save({ validateBeforeSave: false });
     return NextResponse.json({ success:true ,message: "address added successfully",data:user.address }, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
