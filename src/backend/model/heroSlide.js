import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema({
    heroImage: {
        type: String,
    },
}, { timestamps: true });

const heroSlide = mongoose.models.heroSlide || mongoose.model("heroSlide", heroSlideSchema);
export default heroSlide;