import mongoose,{plugin} from 'mongoose';
import slugify from 'mongoose-simple-slugify';

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
    slug : {
        type : String,
        source : 'SubCategoryName',
        trim : true,
        unique : true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Categories',
        required : true
    }
},{timestamps : true}).plugin(slugify);

const SubCategory = mongoose.models.SubCategories || mongoose.model('SubCategories', SubCategorySchema);

export default SubCategory;