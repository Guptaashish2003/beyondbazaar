import { NextResponse } from "next/server"
import connectDB from "@/backend/DATABASE/ConnectDB"  //database connection
import Product from "@/backend/model/Product"


export async function GET(request){

   await connectDB()
   try {
      const product = await Product.find()
      const lenProduct = product.length
      return NextResponse.json({ success: true, length: lenProduct, message: "products Found", data: product }, { status: 200 });
      
   } catch (error) {
      return NextResponse.json({success:false, message:error.message},{status:400})
      
   }
}

