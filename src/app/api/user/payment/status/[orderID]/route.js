import User from "@/backend/model/User";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import isOauth from "@/backend/middlewere/isOauth";
import { Cashfree } from "cashfree-pg";


export async function GET(request, context) {
  try {
    Cashfree.XClientId = process.env.CASHFREE_APP_ID;
    Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
    const check = await isOauth(request);
    const orderID = context.params.orderID;
    // if (!check._id) {
    //   return check;
    // }
    
    const res = await Cashfree.PGOrderFetchPayments("2023-08-01", orderID)
    console.log("res", res);
    const paymentDetails = res.data[0];
     return NextResponse.json({ success: true, data: paymentDetails }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
