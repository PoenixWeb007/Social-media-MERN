import express from "express";
import {
  addRemoveFriend,
  getFriendsUser,
  getUser,
} from "../controllers/user.js";

export const usersRouter = express.Router();

usersRouter.get("/:id", getUser);
usersRouter.get("/friends", getFriendsUser);
usersRouter.patch("/:id/:friendId", addRemoveFriend);
