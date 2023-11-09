import express from "express";
import { authRouter } from "./auth.js";
import { usersRouter } from "./users.js";
import { postsRouter } from "./posts.js";
import { tokenVerification } from "../middlewares/tokenVerification.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users/", tokenVerification, usersRouter);
router.use("/posts", tokenVerification, postsRouter);

export default router;
