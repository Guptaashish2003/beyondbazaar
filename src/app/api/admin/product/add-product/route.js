import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import Product from "@/backend/model/Product";

export async function POST(request) {
  await connectDB();

  try {
    const data = await request.json();
    const {
      productName,
      productDescription,
      productImage,
      productSlug,
      productPrice,
      productQuantity,
      productAvailable,
      productCategory,
    } = data;
    const product = await Product.create({
      productName,
      productDescription,
      productImage,
      productSlug,
      productPrice,
      productQuantity,
      productAvailable,
      productCategory,
    });

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
