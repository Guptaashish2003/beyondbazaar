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
    console.log(productCategory ,
      !productDescription ,
      !productImage ,
      !productAvailable ,
      !title ,
      !description ,
      !productTags ,
      !productCategory,"isTrue")
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
    console.log(data.title,data.variants,"data");
  //   if (isVariantAvailable){
  //   if (!variants || variants.length === 0) {
  //     // For products without variants, ensure productPrice and productQuantity are provided
  //     if (!productPrice || !productQuantity) {
  //       return NextResponse.json(
  //         { success: false, message: "Price and Quantity are required for products without variants" },
  //         { status: 400 }
  //       );
  //     }
  //   } else {
  //     // Validate variants if they exist
  //     for (const variant of variants) {
  //       if (!variant.variantType  || !variant.variantDetails) {
  //         return NextResponse.json(
  //           { success: false, message: "Each variant must have size, color, price, and stock" },
  //           { status: 400 }
  //         );
  //       }
  //       if (variant.stock < 1) {
  //         productQuantity += variant.stock;
  //         return NextResponse.json(
  //           { success: false, message: `Variant with size ${variant.size} and color ${variant.color} is out of stock` },
  //           { status: 400 }
  //         );
  //       }
  //     }
  //   }
  // }
    console.log(",..............................",variants[0].variantDetails)
    
    // Create the product, supporting both cases (with or without variants)
    const product = await Product.create({
      productName,
      productDescription,
      productImage,
      productPrice:productPrice,  // Only include productPrice if no variants
      productQuantity:productQuantity,  // Only include productQuantity if no variants
      productAvailable,
      seo: { title, description },
      productTags,
      productCategory,
      variants  // Include variants if present, or leave undefined if not
    });
    
    console.log(",..........................product....",product)
    // Return success response
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
