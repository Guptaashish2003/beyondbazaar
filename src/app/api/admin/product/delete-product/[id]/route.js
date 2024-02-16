import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import Product from "@/backend/model/Product";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";

//dlete product

export async function DELETE(request, context) {
  await connectDB();
  try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        } 
        const role =  outhRoles(["admin"], request);
        if (!role) {
            return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
        }
        const id = context.params.id;
        
      const product = await Product.findByIdAndDelete(id);
    
      // console.log(product);
    
      return NextResponse.json({ sucess:true ,message: "Deleted-successfully" }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
    
  }
}
