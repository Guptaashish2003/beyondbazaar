import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import Order from "@/backend/model/Order";
import isOauth from "@/backend/middlewere/isOauth";
import Product from "@/backend/model/Product";

export async function GET(request, context) {
  await connectDB();
  try {
    const check = await isOauth(request);
    if (!check._id) {
      return check;
    }
    const id = context.params.id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid Input" },
        { status: 400 }
      );
    }
    const orders = await Order.findOne({ user: check._id, _id: id });
    // console.log("ordersz...................",orders)
    const productDetails = await Promise.all(
      orders.orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        return product ? { ...item.toObject(), productDetails: product } : null;
      })
    );
    const discountedPrice = productDetails.reduce(
      (acc, item) => acc + item.productDetails.discountedPrice * item.qty,
      0
    );
    
    if (!orders) {
      return NextResponse.json(
        { success: false, message: "Order Not Found" },
        { status: 404 }
      );
    }

    const orderWithProductDetails = {
      ...orders.toObject(),
      orderItems: productDetails,
    };

    return NextResponse.json(
      { success: true, message: "Order Found", data: orderWithProductDetails },
      { status: 200 }
    );
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 404 }
    );
  }
}
