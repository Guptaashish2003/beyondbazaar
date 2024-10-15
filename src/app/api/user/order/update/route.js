import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import Order from "@/backend/model/Order";
import isOauth from "@/backend/middlewere/isOauth";

export async function PUT(request) {
  // console.log("Request.............:");
  await connectDB();
  try {
    const check = await isOauth(request);
    const userID = check._id;
    // console.log("User ID:", userID);
    const { data, payment_method } = await request.json();

    // Debugging: Check if you have the correct order ID
    // Find the existing order
    const existingOrder = await Order.findOne({ orderId: data?.order_id });
    if (!existingOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }
    // Prepare Payment Details
    const PaymentDetails = {
      order_amount: data?.order_amount,
      payment_currency: data?.payment_currency,
      payment_completion_time: data?.payment_completion_time,
      gateway_name: data?.gateway_name,
      payment_method: JSON.stringify(payment_method),
      payment_status: data?.payment_status,
      payment_group: data?.payment_group,
      payment_time: data?.payment_time,
    };

    // Update the payment status
    const isPaid = data?.payment_status === "SUCCESS";
    if(existingOrder.discount){
      const updatePromo = await Promocode.findById(existingOrder.discount);
      if(updatePromo){
        updatePromo.userRestriction.push(userID);
        await updatePromo.save();
      }
    }

    // Update the order with new payment details
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: data?.order_id },
      {
        $set: {
          Paymentdetails: PaymentDetails, // Ensure it's Paymentdetails with lowercase "d"
          isPaid: isPaid,
        },
        isPaid: isPaid,
      },
      { new: true } // Return the updated document
    );

    // Check if the update was successful
    // console.log("Updated Order:", updatedOrder);

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Failed to update order" },
        { status: 500 }
      );
    }
    // if(data?.payemnt_status === "SUCCESS"){


    // }

    return NextResponse.json(
      { success: true, message: "Order Updated", data: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
