import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    categoryName : {
        type : String,
        required : true,
        trim : true,
        maxlength : 32
    },
    categoryDescription :{
        type : String,
        required : true,
        trim : true,
        maxlength : 2000
    } ,
    categoryImage : [{
        type : String,
        required : true,
        trim : true
    } ],
    categorySlug : {
        type : String,
        required : true,
        trim : true,
        unique : true,
    }

},{timestamps : true});

const Category = mongoose.models.Categories || mongoose.model('Categories', CategorySchema);

export default Category;