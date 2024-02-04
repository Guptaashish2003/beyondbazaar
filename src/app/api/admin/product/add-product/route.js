import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import Product from "@/backend/model/Product";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";

export async function POST(request) {
  await connectDB();
  try {
    const  user  = await isOauth(request);
        if (!user) {
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 400 });
        }
        const role =  outhRoles(["admin"], request);
        if (!role) {
            return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
        }
    const data = await request.json();
    const {
      productName,
      productDescription,
      productImage,
      productPrice,
      productQuantity,
      productAvailable,
      productTags,
      productCategory
    } = data;

    if(
      !productName ||
      !productDescription ||
      !productImage ||
      !productPrice ||
      !productQuantity||
      !productAvailable||
      !productTags ||
      !productCategory
    ) {

      return NextResponse.json(
        { success: false, message: "Invalid Input" },
        { status: 400 }
      );
    }
    const product = await Product.create({
      productName,
      productDescription,
      productImage,
      productPrice,
      productQuantity,
      productAvailable,
      productCategory
    });
    return NextResponse.json({ success: true, data: product,message:"product added" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(

      
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
