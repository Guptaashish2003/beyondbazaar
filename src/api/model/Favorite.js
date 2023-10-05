import mongoose from "mongoose";
import User from './User';
import Product from "./Product";

const FavoriteSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
    },
}, { timestamps: true });

const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', FavoriteSchema);
export default Favorite;