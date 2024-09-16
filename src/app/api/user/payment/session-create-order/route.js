import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import isOauth from "@/backend/middlewere/isOauth";
import Cart from "@/backend/model/Cart";
import Product from "@/backend/model/Product";
import Promocode from "@/backend/model/Promocode";
import { calculateDiscount } from "@/app/api/apply-promo/route";
import { Cashfree } from "cashfree-pg";
import Order from "@/backend/model/Order";


export async function POST(request) {
  console.log("hellowww...............................")
  await connectDB();
  try {
    Cashfree.XClientId = process.env.CASHFREE_APP_ID;
    Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

    console.log(
      Cashfree.XClientId,
      Cashfree.XClientSecret,
      Cashfree.XEnvironment
    );
    const check = await isOauth(request);
    if (!check._id) {
      return check;
    }
    const userID = check._id;
    const data = await request.json();
    let { orderItems, shippingInfo, shippingPrice, discount, method, orderId } =
      data;

    if (!orderItems || !shippingInfo || !shippingPrice || !method) {
      return NextResponse.json(
        { success: false, message: "Invalid Input" },
        { status: 400 }
      );
    }

    let itemsPrice;
    let product;
    if (method === "bycart") {
      const cart = await Cart.find({ userID: check._id }).populate(
        "productID",
        "productPrice productQuantity"
      );
      itemsPrice = cart.reduce((acc, curr) => {
        return acc + curr.productID.productPrice * curr.productQuantity;
      }, 0);
    } else if (method === "byproduct") {
      product = await Product.findById(orderItems[0].product);
      itemsPrice = product.productPrice * Number(orderItems[0].qty);
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid Input" },
        { status: 400 }
      );
    }
    let discountAmount = 0;
    let promocodeDoc;
    if (discount) {
      promocodeDoc = await Promocode.findById(discount);
      discountAmount = calculateDiscount(
        promocodeDoc.discountType,
        promocodeDoc.discountValue,
        itemsPrice,
        promocodeDoc.maxDiscount
      );
    }
    const taxPrice = itemsPrice * 0.18;
    const totalPrice = itemsPrice + taxPrice + shippingPrice - discountAmount;
    shippingInfo = check.address.filter((val) => {
      return val._id.valueOf() === shippingInfo;
    });

    if (discount && check.role !== "admin") {
      promocodeDoc.userRestriction.push(check._id);
      await promocodeDoc.save();
    }

    console.log("data.....", orderId);
    const order = await Order.create({
      user: userID,
      orderItems,
      shippingInfo: shippingInfo[0],
      itemsPrice,
      orderId: orderId,
      taxPrice,
      shippingPrice,
      totalPrice,
      discount,
      discountAmount,
    });
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Something went wrong" },
        { status: 400 }
      );
    }
    var request = {
      order_amount: Math.ceil(totalPrice),
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: shippingInfo[0]._id,
        customer_phone: `${shippingInfo[0].phNumber}`,
        customer_email: shippingInfo[0].email,
        customer_name: shippingInfo[0].name,
      },
      order_meta: {
        return_url: `${process.env.BASEURL}/user/notification/${orderId}/${userID}`,
      },
      order_note: "",
    };
    const getSession = await Cashfree.PGCreateOrder("2022-09-01", request);
    if (discount && check.role !== "admin") {
      promocodeDoc.userRestriction.push(check._id);
      await promocodeDoc.save();
    }
    return NextResponse.json(
      {
        success: true,
        data: {
          session: getSession.data.payment_session_id,
          expiry: getSession.data.order_expiry_time,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
