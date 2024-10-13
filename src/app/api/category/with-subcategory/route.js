import Category from "@/backend/model/Category";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection


const pipeline = [
    {
      $lookup: {
        from: 'subcategories', // the name of the SubCategory collection
        localField: '_id', // the field from the Category collection (ObjectId)
        foreignField: 'category', // the field from the SubCategory collection that references the Category
        as: 'subcategories', // the array field to store the joined subcategories
      },
    },
    {
      $project: {
        categoryName: 1, // include the categoryName field
        categoryImage: 1, // include the categoryImage field
        subcategory: {
          $map: {
            input: '$subcategories', // map over the subcategories array
            as: 'sub', // alias for each element
            in: '$$sub.SubCategoryName', // extract only the SubCategoryName from each subcategory
          },
        },
      },
    },
  ];


//creating a new subCategory by 
export async function GET(request) {
    await connectDB();
    try {
        const category = await Category.aggregate(pipeline);
        const categoryCount = await Category.countDocuments();
        return NextResponse.json({ success: true, length:categoryCount, data: category }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
        
    }
}