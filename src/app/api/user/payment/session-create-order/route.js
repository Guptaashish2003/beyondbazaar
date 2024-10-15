import { NextResponse } from "next/server";
import connectDB from "@/backend/DATABASE/ConnectDB";
import isOauth from "@/backend/middlewere/isOauth";
import Cart from "@/backend/model/Cart";
import Product from "@/backend/model/Product";
import Promocode from "@/backend/model/Promocode";
import crypto from "crypto";
import { calculateDiscount } from "@/app/api/apply-promo/route";
import { Cashfree } from "cashfree-pg";
import Order from "@/backend/model/Order";

export async function POST(request) {
  await connectDB();
  try {
    Cashfree.XClientId = process.env.CASHFREE_APP_ID;
    Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
    const check = await isOauth(request);
    if (!check._id) {
      return check;
    }
    const userID = check._id;

    const data = await request.json();
    let { orderItems, shippingInfo, shippingPrice, discount, method, isCod } =
      data;
    console.log("isCod....", isCod);
    if (!orderItems || !shippingInfo || !shippingPrice || !method) {
      return NextResponse.json(
        { success: false, message: "Invalid Input" },
        { status: 400 }
      );
    }
    const count = await Order.countDocuments();
    const timestamp = Date.now().toString(); // Current timestamp
    const randomStr = crypto.randomBytes(4).toString("hex"); // Random string
    let orderId = `ORD-${timestamp}-${randomStr}-000${count + 1}`;

    let itemsPrice;
    let product;

    if (method === "bycart") {
      const cart = await Cart.find({ userID: check._id }).populate(
        "productID",
        "productPrice productQuantity variantId variantDetailId isVariantAvailable variants"
      );
      const CartCalcPrice = cart.map((item) => {
        let productCost = 0;
        if (
          item.productID.variants.length > 0 &&
          item.productID.isVariantAvailable
        ) {
          const variants = item.productID.variants.map((item2) => {
            if (
              item2 &&
              item2._id &&
              item2._id.toString() === item.variantId.toString()
            ) {
              return item2.variantDetails.map((item3) => {
                if (item3._id.toString() === item.variantDetailId.toString()) {
                  productCost += item3.price;
                  return item3;
                }
              });
            }
          });
        } else {
          productCost += item.productID.productPrice;
        }
        return productCost;
      });
      itemsPrice = cart.reduce((acc, curr, index) => {
        return acc + CartCalcPrice[index] * curr.productQuantity;
      }, 0);
    } else if (method === "byproduct") {
      product = await Product.findById(orderItems[0].product);
      if (
        orderItems[0].variantId &&
        orderItems[0].variantDetailId &&
        product.variants.length > 0 &&
        product.isVariantAvailable
      ) {
        const variants = product.variants.map((item) => {
          if (
            item &&
            item._id &&
            item._id.toString() === orderItems[0].variantId.toString()
          ) {
            return item.variantDetails.map((item2) => {
              if (
                item2._id.toString() ===
                orderItems[0].variantDetailId.toString()
              ) {
                product.productPrice = item2.price;
                return item2;
              }
            });
          }
        });
        // console.log("variant....", variants)
      }
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
    const order = await Order.create({
      user: userID,
      orderItems,
      shippingInfo: shippingInfo[0],
      itemsPrice,
      orderId: orderId,
      taxPrice,
      shippingPrice,
      totalPrice,
      isCod,
      discount,
      discountAmount,
    });
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Something went wrong" },
        { status: 400 }
      );
    }
    if (isCod) {
      if (method === "bycart") {
        await Cart.findOneAndDelete({ userID: check._id });
      }
      return NextResponse.json(
        { success: true, message: "Order Created", data: order },
        { status: 201 }
      );
    } else {
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
      if (method === "bycart") {
        await Cart.findOneAndDelete({ userID: check._id });
      }
      return NextResponse.json(
        {
          success: true,
          data: {
            session: getSession.data.payment_session_id,
            expiry: getSession.data.order_expiry_time,
            isCod: isCod,
            orderId: orderId,
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    // console.log("error......", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
