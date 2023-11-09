import Post from "../models/post.js";
import User from "../models/user.js";

export const creatPost = async function (req, res) {
  const { userId, description, picturePath } = req.body;
  const user = await User.findById(userId);
  const newPost = new Post({
    userId,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    description,
    picturePath,
    userPicturePath: user.picturePath,
    likes: {},
    comments: [],
  });
  const savedPost = await newPost.save();
  res.json(savedPost);
};

export const getFeedPosts = async function (req, res) {
  try {
    const posts = await Post.find();
    console.log(posts);
    res.json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async function (req, res) {
  try {
    const { id } = req.params;
    const posts = await Post.find({ userId: id });
    res.json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likeDislike = async function (req, res) {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);
    console.log(isLiked);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    await post.save();
    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ Message: `error serveur` });
    console.log(`message:`, error.message);
  }
};
