import ProductReview from "@/backend/model/ProductReview";
import ConnectDB from "@/backend/DATABASE/ConnectDB";
import isOauth from "@/backend/middlewere/isOauth";
import { NextResponse } from "next/server";
// getting only review data which given by a user for edit
export async function GET(reqest, context) {
  await ConnectDB();
  try {
    const check = await isOauth(request);
    if (!check._id) {
        return check
    }
    const id = await context.params.id;
    const review = await ProductReview.findById(id)
    if (!review) {
      return NextResponse.json({ success: false, message: "No review found" }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: review }, { status: 200 });
       
   
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    
  }
}