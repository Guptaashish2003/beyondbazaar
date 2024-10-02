import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB"; // Database connection
import Product from "@/backend/model/Product";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";

// Add product handler
export async function POST(request) {
  await connectDB(); // Connect to database
  try {
    // Check authentication
    const check = await isOauth(request);
    if (!check._id) {
      return check;
    }

    // Check for admin authorization
    const role = outhRoles(["admin"], request);
    if (!role) {
      return NextResponse.json({ success: false, message: "You are not Authorized" }, { status: 400 });
    }

    // Parse request body
    const data = await request.json();
    
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
    
    // Validate either default price/quantity or variants
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
      productQuantity = newQuantity;
    }
  }

    // Create the product, supporting both cases (with or without variants)
    const product = await Product.create({
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
    
    return NextResponse.json({ success: true, data: "product", message: "Product added" }, { status: 200 });
  } catch (error) {
    // Error handling
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
