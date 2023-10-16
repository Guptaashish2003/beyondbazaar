import mongoose from 'mongoose';

const SubCategorySchema = new mongoose.Schema({
    SubCategoryName : {
        type : String,
        required : true,
        trim : true,
        maxlength : 32
    },
    SubCategoryDescription :{
        type : String,
        required : true,
        trim : true,
        maxlength : 2000
    } ,
    SubCategoryImage : [{
        type : String,
        required : true,
        trim : true
    } ],
    SubCategorySlug : {
        type : String,
        required : true,
        trim : true,
        unique : true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Categories',
        required : true
    }
},{timestamps : true});

const SubCategory = mongoose.models.SubCategories || mongoose.model('SubCategories', SubCategorySchema);

export default SubCategory;