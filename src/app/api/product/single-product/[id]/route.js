import { NextResponse } from "next/server"
import connectDB from "@/backend/DATABASE/ConnectDB"  //database connection
import Product from "@/backend/model/Product"

export async function GET(request,context){
    await connectDB()
    try {
        const id = context.params.id;
        const product = await Product.findById(id)
        return NextResponse.json({success:true , data:product},{status:200})
    } catch (error) {
        return NextResponse.json({success:false, message:error.message},{status:400})
    }
}