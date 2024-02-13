import { NextResponse } from "next/server"
import connectDB from "@/backend/DATABASE/ConnectDB"  //database connection
import Product from "@/backend/model/Product"
import Apifeatures from "@/backend/utils/apiFeatures"


export async function GET(request){

   await connectDB()
   try {
      console.log('.............all........................product')
      const rawParams = request.url.split('?')[1];
      const keyword = new URLSearchParams(rawParams).get('keyword')
      const limit = new URLSearchParams(rawParams).get('limit')
      const page = new URLSearchParams(rawParams).get('page')
      const fields = new URLSearchParams(rawParams).get('fields')
      const sort = new URLSearchParams(rawParams).get('sort')
      const apiFeatures = new Apifeatures(Product.find(),{keyword,limit,page,fields,sort})
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate()
      const product = await apiFeatures.query;
      const countQuery = new Apifeatures(Product.find(),{keyword,limit,page,fields,sort})
      .search()
      .filter()
      .sort()
      .limitFields()
      const productcount = await Product.countDocuments(countQuery.query);
      return NextResponse.json({ success: true, length: productcount, message: "products Found", data: product }, { status: 200 });
      
   } catch (error) {
      return NextResponse.json({success:false, message:error.message},{status:400})
      
   }
}

