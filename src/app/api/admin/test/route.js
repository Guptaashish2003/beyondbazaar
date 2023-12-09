import SubCategory from "@/backend/model/SubCategory";
import connectDB from "@/backend/DATABASE/ConnectDB"; // database connection
import product from "@/Data/product.json";

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  await connectDB();
  try {
    // Function to generate Unsplah image URL
    function generateUnsplashUrl(electronicNumber, count) {
      return `https://source.unsplash.com/random/?electronic=${electronicNumber}&count=${count}`;
    }

    // Function to update 'productImage' in each entry
    function updateProductImage(entry, index) {
      const numberOfImages = 5; // Number of images you want for each entry
      entry.productImage = Array.from({ length: numberOfImages }, (_, i) =>
        generateUnsplashUrl(index + 1, i + 1)
      );
      return entry;
    }

    // Update 'productImage' for each entry
    const updatedJsonEntries = product.map(updateProductImage);

    // Log the updated JSON entries
    console.log(JSON.stringify(updatedJsonEntries, null, 2));

    // Return a valid response
    return NextResponse.json({ success: true, updatedJsonEntries }, { status: 200 });

  } catch (error) {
    // Handle errors and return an appropriate response
    console.error(error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 400 });
  }
}
