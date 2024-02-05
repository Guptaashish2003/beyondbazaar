import User from "./User";
import Product from "./Product";
import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    orderItems: [
        {
            qty: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product,
            },
            seller: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                // required: true,
            },
            status: { // Individual product status for this seller
                type: String,
                required: true,
                default:"pending",
                enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            },
        }
    ],
    shippingInfo: 
        {
          name:{
            type: String,
          },
          email:{
            type: String,
          },
          street: {
            type: String,
            maxlength: [30, "Street cannot be more than 60 characters"],
          },
  
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
          number: {
            type:Number,
          },
        }
      ,
    // paymentMethod: { type: String, required: true , default : "Paypal" },
    // paymentResult: {
    //     id: String,
    //     status: String,
    //     update_time: String,
    //     email_address: String,
    // },
    itemsPrice: { type: Number, required: true },
    discount:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promocode'
    },
    // shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;