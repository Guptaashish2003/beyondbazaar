import mongoose from "mongoose";
import User from "./User";
import Product from "./Product";
import Category from "./Category";
//write schema here for particular user and for particular product and particular category

const PromocodeSchema = new mongoose.Schema({
    promocode: {
        type: String,
        required: true,
        unique: true,
    },
    discountType: {
        type: String,
        required: true,
        enum: ["Percentage", "Fixed", "FreeShipping"],
    },
    discountValue: {
        type: Number,
        required: true,
    },
    maxDiscount: {
        type: Number,
        required: true,
    },
    minOrder: {
        type: Number,
        required: true,
    },
    maxOrder: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
    },
    limit: {
        type: Number,
        default: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    userRestriction: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    }],
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category
    },
}, { timestamps: true });

const Promocode = mongoose.models.Promocode || mongoose.model("Promocode", PromocodeSchema);
export default Promocode;