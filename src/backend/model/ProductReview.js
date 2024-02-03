import mongoose from "mongoose"
import User from "./User"
import Product from "./Product"

//write schema here for product review or feedback

const ProductReviewSchema = new mongoose.Schema(
    {
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
        },
        productId: {
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
        title: {
        type: String,
        required: true,
        default: "Good"
        },
        description: {
        type: String,
        required: true,
        default: "Good"
        },
    },
    { timestamps: true }
    )

    const ProductReview = mongoose.models.ProductReview || mongoose.model("ProductReview", ProductReviewSchema)
export default ProductReview



