import mongoose from "mongoose"
import User from "./User"
import Product from "./Product"

//write schema here for product review or feedback

const ProductSchema = new mongoose.Schema(
    {
        userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
        },
        productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
        },
        rating: {
        type: Number,
        required: true,
        default: 1
        },
        photos: {
        type: Array,
        required: false,
        default: []
        },
        feedback: {
        type: String,
        required: true,
        default: "Good"
        }
    },
    { timestamps: true }
    )


