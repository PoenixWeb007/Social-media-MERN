import express from "express";
import {
  creatPost,
  getFeedPosts,
  getUserPosts,
  likeDislike,
} from "../controllers/post.js";
import {
  AddComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/comments.js";

export const postsRouter = express.Router();

/* CREATE */
postsRouter.post("/", creatPost);
postsRouter.post("/:postId", likeDislike);
postsRouter.post("/:postId/comments", AddComment);

/* READ */
postsRouter.get("/", getFeedPosts);
postsRouter.get("/:id", getUserPosts);
postsRouter.get("/:postId/comments", getComments);

/* DELETE */
postsRouter.delete("/:postId/comments", deleteComment);

/* UPDATE */
postsRouter.patch("/:postId/comments", updateComment);
