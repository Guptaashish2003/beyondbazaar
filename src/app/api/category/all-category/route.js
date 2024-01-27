import Category from "@/backend/model/Category";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import Apifeatures from "@/backend/utils/apiFeatures"




//creating a new category by 
export async function GET(request) {
    await connectDB();
    try {
        const rawParams = request.url.split('?')[1];
      const keyword = new URLSearchParams(rawParams).get('keyword')
      const limit = new URLSearchParams(rawParams).get('limit')
      const page = new URLSearchParams(rawParams).get('page')
      const fields = new URLSearchParams(rawParams).get('fields')
      const sort = new URLSearchParams(rawParams).get('sort')
      const apiFeatures = new Apifeatures(Category.find(),{keyword,limit,page,fields,sort})
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate()
      const category = await apiFeatures.query;
      const countQuery = new Apifeatures(Category.find(),{keyword,limit,page,fields,sort})
      .search()
      .filter()
      .sort()
      .limitFields()
      const categoryCount = await Category.countDocuments(countQuery.query);
        return NextResponse.json({ success: true, length:categoryCount, data: category }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
        
    }
}