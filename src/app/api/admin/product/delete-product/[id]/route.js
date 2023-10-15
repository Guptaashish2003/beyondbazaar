import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import Product from "@/backend/model/Product";

//dlete product

export async function DELETE(request, context) {
  await connectDB();
  try {
      const id = context.params.id;
      
      const product = await Product.findByIdAndDelete(id);
    
      console.log(product);
    
      return NextResponse.json({ sucess:true ,message: "Deleted-successfully" }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
    
  }
}
