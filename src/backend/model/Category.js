import mongoose from 'mongoose';
import slugify from "mongoose-simple-slugify"

const CategorySchema = new mongoose.Schema({
    categoryName : {
        type : String,
        required : true,
        trim : true,
        maxlength : 32
    } ,
    categoryImage : [{
        type : String,
        required : true,
        trim : true
    } ],
    slug : {
            source: 'categoryName', // "title" field will be used as source for slug generation
            type: String,
            // required: [true, 'please enter the product slug'],
            unique: true,
    }

},{timestamps : true}).plugin(slugify);

const Category = mongoose.models.Categories || mongoose.model('Categories', CategorySchema);

export default Category;