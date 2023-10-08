import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import Product from "@/backend/model/Product";

//update product

export async function PUT(request, context) {
  await connectDB();

  try {
      const data = await request.json();
      const id = context.params.id;
      
      const product = await Product.findByIdAndUpdate(id, data);
    
     return NextResponse.json({ sucess:true ,message: "Updated-successfully" }, { status: 200 });
      
   } catch (error) {
       return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
       );
      
   }
}
