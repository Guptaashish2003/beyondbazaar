import User from "./User";
import Product from "./Product";
import mongoose from "mongoose";
import Promocode from "./Promocode";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    orderItems: [
      {
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        isVariantAvailable: {
          type: Boolean,
          default: false,
        },
        variantId:{
          type:mongoose.Schema.Types.ObjectId,
        },
        variantDetailId:{type:mongoose.Schema.Types.ObjectId},
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Product,
        },
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          required: true,
          default: "pending",
          enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        },
      },
    ],
    shippingInfo: {
      name: { type: String },
      email: { type: String },
      street: {
        type: String,
        maxlength: [30, "Street cannot be more than 60 characters"],
      },
      houseNo: { type: String },
      city: {
        type: String,
        required: [true, "Please provide your city"],
        maxlength: [30, "City cannot be more than 60 characters"],
      },
      state: {
        type: String,
        required: [true, "Please provide your state"],
        maxlength: [30, "State cannot be more than 60 characters"],
      },
      District: {
        type: String,
        required: [true, "Please provide your district"],
        maxlength: [30, "district cannot be more than 60 characters"],
      },
      pincode: {
        type: String,
        required: [true, "Please provide your pincode"],
        maxlength: [30, "pincode cannot be more than 60 characters"],
      },
      country: {
        type: String,
        required: [true, "Please provide your country"],
        maxlength: [30, "country cannot be more than 60 characters"],
      },
      phNumber: { type: Number },
    },

    orderId: { type: String, required: true,unique: true, },
    Paymentdetails: {
    order_amount: Number,
    payment_currency: String,
    payment_completion_time: Date,
    gateway_name: String,
    payment_method: String,
    payment_status: String,
    payment_group: String,
    payment_time: Date,
  },
    itemsPrice: { type: Number, required: true },
    discount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Promocode,
    },
    discountAmount: { type: Number, default: 0 },
    taxPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    totalPrice: { type: Number, required: true },
    isDelivered: { type: Boolean, default: false },
    isCod: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
