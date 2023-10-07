import { NextResponse } from "next/server"
import connectDB from "@/backend/DATABASE/ConnectDB"  //database connection
import Product from "@/backend/model/Product"


export async function GET(request){

   await connectDB()
   const product = await Product.find()

   return NextResponse.json({message:product},{status:200})
}

