import { NextResponse } from 'next/server';
import connectDB from '@/backend/DATABASE/ConnectDB';
import Product from '@/backend/model/Product';
import mongoose from 'mongoose';

export async function GET(request, context) {
  await connectDB();
  
  try {
    const param = context.params.idOrSlug;  // This can be either id or slug
    
    // Check if the param is a valid ObjectId
    const isObjectId = mongoose.Types.ObjectId.isValid(param);
    
    // Determine query condition based on whether it's an ObjectId or a slug
    const query = isObjectId ? { _id: param } : { slug: param };

    // Get product by either _id or slug
    const product = await Product.findOne(query)
      .populate("productCategory", "category","variant")
      .populate({
        path: 'productCategory',
        populate: [
          {
            path: 'category',
            select: 'categoryName',
          },
        ],
      });

    // If product is found, return it
    if (product) {
      return NextResponse.json({ success: true, data: product }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
