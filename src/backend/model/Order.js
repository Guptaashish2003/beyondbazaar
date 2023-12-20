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

        }
    ],
    shippingInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User.address'
    },
    // shippingInfo: {
    //     fullName: { type: String, required: true },
    //     address: { type: String, required: true },
    //     city: { type: String, required: true },
    //     postalCode: { type: Number, required: true },
    //     country: { type: String, required: true },
    // },
    // paymentMethod: { type: String, required: true , default : "Paypal" },
    // paymentResult: {
    //     id: String,
    //     status: String,
    //     update_time: String,
    //     email_address: String,
    // },
    itemsPrice: { type: Number, required: true },
    // discount:{ type: Number},
    // shippingPrice: { type: Number, required: true },
    // taxPrice: { type: Number },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
},{timestamps : true});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;