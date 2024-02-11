import mongoose,{plugin} from "mongoose";
import SubCategory from "./SubCategory";
import slugify from "mongoose-simple-slugify"
const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'please enter productName'],
    },
    productDescription: {
      type: String,
      required: [true, 'please enter the product description'],
    },
    productImage: [
      {
        type: String,
        required: [true, 'please select the product image'],
      },
    ],
    slug: {
      source: 'productName', // "title" field will be used as source for slug generation
      type: String,
      // required: [true, 'please enter the product slug'],
      unique: true,
    },
    productPrice: {
      type: Number,
      required: [true, 'please enter the product price'],
    },
    productQuantity: {
      type: Number,
      required: [true, 'please enter the product quantity'],
    },
    productAvailable: {
      type: Boolean,
      required: [true, 'please enter the product availiblity'],
    },
    productTags: [
      {
        type: String,
        required: [true, 'please enter the product tags'],
      },
    ],
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SubCategory,
      required: true
    },
    mostPoular: {
      type: Number,
      default: false,
    },
    size:{
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
).plugin(slugify);


const Product = mongoose.models.Products || mongoose.model('Products', ProductSchema);
export default Product;
