import { NextResponse } from 'next/server';
import Post from '../model/Post';

const createPost = async (req) => {
  const { title, body } = req.body;

  const post = new Post({
    title,
    body,
  });

  await post.save();

  NextResponse.status(201).json({
    message: 'Post created successfully!',
  });
};
export default createPost;