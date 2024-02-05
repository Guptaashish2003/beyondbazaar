import Order from "@/backend/model/Order";
import User from "@/backend/model/User";
import Product from "@/backend/model/Product";
import DashBoard from "@/backend/model/DashBoard";
import ConnectDB from "@/backend/DATABASE/ConnectDB";
import { NextResponse } from "next/server";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";

//calculate dailychange,monthlychange,yearlychange of totalSales ,totalOrders,totalUsers,totalProducts, totalReviews,totalDelivered,totalCancelled,totalPending,totalShipped,totalOrderByUser

export async function GET(request) {
  await ConnectDB();
  try {
    const check = await isOauth(request);
    if (!check._id) {
        return check
    }
    const role = outhRoles(["admin"], request);
    if (!role) {
      return NextResponse.json(
        { success: false, message: "You are not Authorized" },
        { status: 400 }
      );
    }
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    // console.log(totalSales, "totalSales");

    function calculatePercentageChange(previous, current) {
      return ((current - previous) / Math.abs(previous)) * 100;
    }

    const currentDate = new Date();

    const startDate = new Date(currentDate);
    startDate.setMonth(currentDate.getMonth() - 1);
    const endDate = Date.now();
    const query = {
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    };
    const totalUserByDate = await User.countDocuments(query);
    const totalProductByDate = await Product.countDocuments(query);
    const totalOrderByDate = await Order.countDocuments(query);
   
    console.log(totalSalesByDate, "totalSalesByDate")
    console.log(totalUsers, totalUserByDate, "totalUserByDate")
    const totalUserChange = calculatePercentageChange(
      totalUsers+totalUserByDate,
      totalUsers 
    );
    const totalProductChange = calculatePercentageChange(
      totalProducts+ totalProductByDate,
      totalProducts 
    );
    const totalOrderChange = calculatePercentageChange(
      totalOrders+ totalOrderByDate,
      totalOrders 
    );
    

    // console.log(totalUserByDate,"totalUserByDate");

    return NextResponse.json(
      {
        success: true,
        message: "percentage changed",
        data: { totalUserChange, totalProductChange, totalOrderChange, },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
