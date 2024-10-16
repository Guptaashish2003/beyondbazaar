import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import Order from "@/backend/model/Order";
import isOauth from "@/backend/middlewere/isOauth";

export async function GET(request, context) {
  await connectDB();
  try {
    const check = await isOauth(request);
    let orders;
    if (!check._id) {
      return check;
    }
    const id = context.params.id;

    if (!id) {
      // console.log(id)
      return NextResponse.json(
        { success: false, message: "Invalid Input" },
        { status: 400 }
      );
    }
    if (check.role === "admin") {
      orders = await Order.findOne({ _id: id }).populate({
        select: "orderItems orderStatus orderTotal orderDate",
        path: "orderItems",
        populate: [
          {
            path: "product",
            select: "productName productImage seo productPrice variants",
          },
        ],
      });
    } else {
      orders = await Order.findOne({ user: check._id, _id: id }).populate({
        select: "orderItems orderStatus orderTotal orderDate",
        path: "orderItems",
        populate: [
          {
            path: "product",
            select: "productName productImage seo productPrice variants",
          },
        ],
      });
      // console.log("orders",orders)
    }
    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { success: false, message: "Order Not Found" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Order Found", data: orders },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
