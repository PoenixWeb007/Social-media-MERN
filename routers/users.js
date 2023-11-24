import express from "express";
import {
  addRemoveFriend,
  getFriendsUser,
  getUser,
  getUsers,
} from "../controllers/user.js";

export const usersRouter = express.Router();

usersRouter.get("/:id", getUser);
usersRouter.post("/", getUsers);
usersRouter.get("/friends", getFriendsUser);
usersRouter.patch("/:id/:friendId", addRemoveFriend);
