import { NextResponse } from "next/server"
import connectDB from "@/backend/DATABASE/ConnectDB"  //database connection
import Product from "@/backend/model/Product"

export async function GET(request,context){
    await connectDB()
    try {
        const slug = context.params.slug;
        const product = await Product.findOne({ slug: slug}).populate("productCategory",'category').populate({
            path: 'productCategory',
            populate: [
              {
                path: 'category',
                select: 'categoryName',
              },
            ],
          })

        return NextResponse.json({success:true , data:product},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, message:error.message},{status:400})
    }
}