import { Schema, model } from 'mongoose';
import slugify from 'mongoose-simple-slugify';


const PostSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    slug: {
      source: 'title',
      type: String,
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  });
  
  // Register the slugify plugin
  PostSchema.plugin(slugify);
  
  // Create the Post model
  const Post = model('Post', PostSchema);
  export default Post;
  