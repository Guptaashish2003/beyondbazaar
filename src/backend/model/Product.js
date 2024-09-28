import mongoose, { plugin, Schema } from "mongoose";
import SubCategory from "./SubCategory";
import slugify from "mongoose-simple-slugify";
import { size } from "@/app/(pages)/single-product/[slug]/opengraph-image";

const VariantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter the price for this variant"], 
  },
  stock: {
    type: Number,
    required: [true, "Please enter the stock quantity"], 
  },
  isAvailable: {
    type: Boolean,
    default: true, 
  },
  variantImage: {
    type: String, // Optional: Image for this specific color/size combination
  },
});
const VariantTypeSchema = new mongoose.Schema({
  variantType: {
    type: String,
    required: true,
  },
  varientDetails: [VariantSchema], // Array of color-price combinations
});
const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "please enter productName"],
    },
    productDescription: {
      type: String,
      required: [true, "please enter the product description"],
    },
    productImage: [
      {
        type: String,
        required: [true, "please select the product image"],
      },
    ],
    slug: {
      source: "productName", // "title" field will be used as source for slug generation
      type: String,
      // required: [true, 'please enter the product slug'],
      unique: true,
    },
    seo: {
      title: {
        type: String,
        // required: [true, 'please enter the product title'],
      },
      description: {
        type: String,
        // required: [true, 'please enter the product description'],
      },
    },
    productPrice: {
      type: Number,
      required: [true, "please enter the product price"],
    },
    productQuantity: {
      type: Number,
      required: [true, "please enter the product quantity"],
    },
    productAvailable: {
      type: Boolean,
      required: [true, "please enter the product availiblity"],
    },
    productTags: [
      {
        type: String,
        required: [true, "please enter the product tags"],
      },
    ],
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SubCategory,
      required: true,
    },
    mostPoular: {
      type: Number,
      default: false,
    },
    isVariantAvailable: {
      type: Boolean,
      default: false,
    },
    variants: [VariantTypeSchema], // Array of variant types
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
).plugin(slugify);

const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);
export default Product;



