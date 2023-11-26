import { NextResponse } from "next/server"
import connectDB from "@/backend/DATABASE/ConnectDB"  //database connection
import Product from "@/backend/model/Product"
import Apifeatures from "@/backend/utils/apiFeatures"


export async function GET(request){

   await connectDB()
   try {
      const rawParams = request.url.split('?')[1];
      const keyword = new URLSearchParams(rawParams).get('keyword')
      const limit = new URLSearchParams(rawParams).get('limit')
      const page = new URLSearchParams(rawParams).get('page')
      const fields = new URLSearchParams(rawParams).get('fields')
      const sort = new URLSearchParams(rawParams).get('sort')
      console.log(keyword,"keyword",fields)
      const apiFeatures = new Apifeatures(Product.find(),{keyword,limit,page,fields,sort})
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate()
      const product = await apiFeatures.query;
      const lenProduct = product.length
      // const lenProduct = product.length
      return NextResponse.json({ success: true, length: lenProduct, message: "products Found", data: product }, { status: 200 });
      
   } catch (error) {
      return NextResponse.json({success:false, message:error.message},{status:400})
      
   }
}

