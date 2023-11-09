import Post from "../models/post.js";

export const AddComment = async function (req, res) {
  try {
    const { postId } = req.params;
    const { userId, comment } = req.body;
    const post = await Post.findById(postId);
    console.log(post.comments);
    post.comments.push({
      commentId: Date.now(),
      userId,
      comment,
    });
    await post.save();
    res.send(post.comments);
  } catch (error) {
    res.status(500).json({ Message: `error serveur` });
    console.log(`message:`, error.message);
  }
};

export const getComments = async function (req, res) {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ Message: `error server` });
    console.log(`message:`, error.message);
  }
};

export const deleteComment = async function (req, res) {
  try {
    const { postId } = req.params;
    const { commentId, userId } = req.body;
    const post = await Post.findById(postId);
    const commentToDelete = post.comments.filter(
      (comment) => comment.commentId === commentId
    )[0];

    /* user verification */
    if (!commentToDelete) {
      return res.json({ message: `comment no exist` });
    } else if (userId !== post.userId && userId !== commentToDelete.userId) {
      return res.json({ message: `user not allowed to delete this comment` });
    }

    /* COMMENT DELETE */
    const newComments = post.comments.filter(
      (comment) => comment.commentId !== commentId
    );
    post.comments = newComments;
    await post.save();
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ Message: `error server` });
    console.log(`message:`, error.message);
  }
};

export const updateComment = async function (req, res) {
  try {
    const { postId } = req.params;
    const { commentId, updatedComment, userId } = req.body;
    const post = await Post.findById(postId);
    const commentToDelete = post.comments.filter(
      (comment) => comment.commentId === commentId
    )[0];

    /* user verification */
    if (!commentToDelete) {
      return res.json({ message: `comment no exist` });
    } else if (userId !== commentToDelete.userId) {
      return res.json({ message: `user not allowed to update this comment` });
    }
    post.comments = post.comments.map((comment) => {
      if (comment.commentId === commentId) {
        return { ...comment, comment: updatedComment };
      }
      return comment;
    });
    await post.save();
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ Message: `error server` });
    console.log(`message:`, error.message);
  }
};
