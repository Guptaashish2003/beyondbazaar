import Order from "@/backend/model/Order";
import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";

export async function POST(request) {
  
    await connectDB();
    try {
      const check = await isOauth(request);
      if (!check._id) {
          return check
      }
        // console.log(request, "request")
        const role = outhRoles(["admin"], request);

        if (!role) {
          return NextResponse.json(
            { success: false, message: "You are not Authorized" },
            { status: 400 }
          );
        }
        const weeklyEarnings = await Order.aggregate([
            {
                $group: {
                    _id: { $week: "$createdAt" },
                    total: { $sum: "$totalPrice" },
                },
            },
          ]);
          // console.log(weeklyEarnings, "weeklyEarnings");
            return NextResponse.json({ success: true, message:"weeklyEarnings" }, { status: 200 });
       
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

}
