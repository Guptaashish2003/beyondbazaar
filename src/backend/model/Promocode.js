import mongoose from "mongoose";

const PromocodeSchema = new mongoose.Schema(
    {
        promocode: {
        type: String,
        required: [true, "Please provide your promocode"],
        maxlength: [30, "Promocode cannot be more than 30 characters"],
        },
        discount: {
        type: Number,
        required: [true, "Please provide your discount"],
        maxlength: [30, "Discount cannot be more than 30 characters"],
        },
        maxDiscount: {
        type: Number,
        required: [true, "Please provide your maxDiscount"],
        maxlength: [30, "MaxDiscount cannot be more than 30 characters"],
        },
        minOrder: {
        type: Number,
        required: [true, "Please provide your minOrder"],
        maxlength: [30, "MinOrder cannot be more than 30 characters"],
        },
        maxOrder: {
        type: Number,
        required: [true, "Please provide your maxOrder"],
        maxlength: [30, "MaxOrder cannot be more than 30 characters"],
        },
        startDate: {
        type: Date,
        required: [true, "Please provide your startDate"],
        maxlength: [30, "StartDate cannot be more than 30 characters"],
        },
        endDate: {
        type: Date,
        required: [true, "Please provide your endDate"],
        maxlength: [30, "EndDate cannot be more than 30 characters"],
        },
        active: {
        type: Boolean,
        required: [true, "Please provide your active"],
        maxlength: [30, "Active cannot be more than 30 characters"],
        },
    },
    {
        timestamps: true,
    }    
)
const Promocode = mongoose.model("Promocode", PromocodeSchema);
