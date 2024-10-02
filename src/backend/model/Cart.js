import mongoose from "mongoose"
import User from "./User"
import Product from "./Product"

const CartSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product
    },
    productQuantity: {
      type: Number,
      required: true,
      default: 1
    },
    variantId:{
      type:mongoose.Schema.Types.ObjectId,
      variantDetails:{type:mongoose.Schema.Types.ObjectId}
    },
  },
  { timestamps: true }
)

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema)
export default Cart
