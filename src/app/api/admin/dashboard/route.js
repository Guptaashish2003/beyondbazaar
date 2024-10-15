import User from "@/backend/model/User";
import Product from "@/backend/model/Product";
import Order from "@/backend/model/Order";
import ConnectDB from "@/backend/DATABASE/ConnectDB";
import { NextResponse } from "next/server";
import { outhRoles } from "@/backend/middlewere/outhRoles";
import isOauth from "@/backend/middlewere/isOauth";
import Dashboard from "@/backend/model/DashBoard";

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
    const totalEarnings = await Order.aggregate([
      {
          $group: {
              _id: null,
              totalItemsPrice: { $sum: "$itemsPrice" },
              totalTaxPrice: { $sum: "$taxPrice" },
              totalTotalPrice: { $sum: "$totalPrice" }
          }
      },
      {
          $project: {
              total: { $subtract: ["$totalTotalPrice", { $add: ["$totalItemsPrice", "$totalTaxPrice"] }] }
          }
      }
  ]);
    // console.log(totalEarnings, "totalEarnings");
    const totalReviews = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalReviews: { $sum: "$rating" },
        },
      },
    ]);

    const totalDelivered = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalDelivered: { $sum: "$isDelivered" },
        },
      },
    ]);
    const totalCancelled = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalCancelled: { $sum: "$isCancelled" },
        },
      },
    ]);
    const totalPending = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalPending: { $sum: "$isPending" },
        },
      },
    ]);
    const totalShipped = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalShipped: { $sum: "$isShipped" },
        },
      },
    ]);
    // in order have orderItems array and in orderItems  need length of array
    const totalOrderByUser = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrderByUser: { $sum: { $size: "$orderItems" } },
        },
      },
    ]);
    // console.log(totalOrderByUser, "totalOrderByUser")

    const data = {
      totalSales: totalSales[0].totalSales,
      UtotalOrderByUser: totalOrderByUser[0].totalOrderByUser,
      totalReviews: totalReviews[0].totalReviews,
      totalDelivered: totalDelivered[0].totalDelivered,
      totalCancelled: totalCancelled[0].totalCancelled,
      totalPending: totalPending[0].totalPending,
      totalShipped: totalShipped[0].totalShipped,
      totalOrderByUser: totalOrderByUser[0].totalOrderByUser,
      totalEarnings:totalEarnings[0].total
    };

    const len = await Dashboard.countDocuments();
    let DashBoardData;
    if (len == 0) {
      DashBoardData = await Dashboard.create({
        totalUsers,
        totalUsers,
        totalProducts,
        totalOrders,
        ...data,
      });
    } else {
      const id = await Dashboard.find();
      // console.log("hello");
      DashBoardData = await Dashboard.findByIdAndUpdate(
        { _id: id[0]._id },
        {
          totalUsers,
          totalProducts,
          totalOrders,
          ...data,
        }
      );
    }

    return NextResponse.json(
      { success: true, message: "DashBoard Data", data: DashBoardData },
      { status: 200 }
    );
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
