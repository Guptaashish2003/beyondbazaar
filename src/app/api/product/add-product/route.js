import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import Product from "@/backend/model/Product";

export async function POST(request ){
    await connectDB()

    const data = await request.json()
    const {productName,productDescription,productImage,productSlug,productPrice,productQuantity,productAvailable,productCategory} = data

    // console.log("jhjuuuiuiuijkkl",request.json()
    console.log("jhjuuuiuiuijkkl",data)

    const product = await Product.create({

        productName,
        productDescription,
        productImage,
        productSlug,
        productPrice,
        productQuantity,
        productAvailable,
        productCategory
    })
    
    console.log(product)

    return NextResponse.json({status:true,data:product},{status:200})
}