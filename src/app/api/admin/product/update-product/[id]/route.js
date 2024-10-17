import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; //database connection
import Product from "@/backend/model/Product";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";

//update product

export async function PUT(request, context) {
  await connectDB();

  try {
        const check = await isOauth(request);
        if (!check._id) {
            return check
        }
        const role =  outhRoles(["admin"], request);
        if (!role) {
            return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
        }
    const data = await request.json();
    const id = context.params.id;
    // console.log(data)
    let {
      productName,
      productDescription,
      productImage,
      productPrice,  // Default price (for products without variants)
      productQuantity,  // Default stock quantity (for products without variants)
      productAvailable,
      title,
      description,
      productTags,
      isVariantAvailable,
      productCategory,
      variants  // Optional: Variants with size, color, price, and stock
    } = data;
    
    // Validate required fields for the main product

    if (
      !productName ||
      !productDescription ||
      !productImage ||
      !productAvailable ||
      !title ||
      !description ||
      !productTags ||
      !productCategory
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid Input" },
        { status: 400 }
      );
    }
    
    if (isVariantAvailable){
    if (!variants || variants.length === 0) {
      // For products without variants, ensure productPrice and productQuantity are provided
      return NextResponse.json(
        { success: false, message: "Price and Quantity are required for products without variants" },
        { status: 400 }
      );
    } else {
      let newQuantity = 0;
      for (const variant of variants) {
        if (!variant.variantType  || !variant.variantDetails) {
          return NextResponse.json(
            { success: false, message: "Each variant must have size, color, price, and stock" },
            { status: 400 }
          );
        }
        for (const detail of variant.variantDetails) {
          if (!detail.price || !detail.stock) {
            return NextResponse.json(
              { success: false, message: "Each variant detail must have price and stock" },
              { status: 400 }
            );
          }
          newQuantity += detail.stock;
        }
        

      }
      // console.log(newQuantity);
      productQuantity = newQuantity;
    }
  }

    // Create the product, supporting both cases (with or without variants)
    const product = await Product.findByIdAndUpdate(id,{
      productName,
      productDescription,
      productImage,
      productPrice:productPrice,  // Only include productPrice if no variants
      productQuantity:productQuantity,  
      productAvailable,
      seo: { title, description },
      productTags,
      productCategory,
      isVariantAvailable,
      variants 
    });
    
    // console.log(data,product)

    return NextResponse.json(
      { success: true, message: "Updated-successfully",data:product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
