import Order from "@/backend/model/Order";
import ConnectDB from "@/backend/DATABASE/ConnectDB";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await ConnectDB();

    const count = await Order.countDocuments();
    const timestamp = Date.now().toString(); // Current timestamp
    const randomStr = crypto.randomBytes(4).toString("hex"); // Random string
    return NextResponse.json({ success: true, data: `ORD-${timestamp}-${randomStr}-000${count+1}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
