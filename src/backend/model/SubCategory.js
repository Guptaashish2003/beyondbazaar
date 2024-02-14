import mongoose,{plugin} from 'mongoose';
import slugify from 'mongoose-simple-slugify';
import Category from './Category';
const SubCategorySchema = new mongoose.Schema({
    SubCategoryName : {
        type : String,
        required : true,
        trim : true,
        maxlength : 32
    },
    slug : {
        type : String,
        source : 'SubCategoryName',
        unique : true,
    },
    category : {
        type :mongoose.Schema.Types.ObjectId,
        ref :Category,
        required : true
    }
},{timestamps : true}).plugin(slugify);

const SubCategory = mongoose.models.SubCategories || mongoose.model('SubCategories', SubCategorySchema);

export default SubCategory;