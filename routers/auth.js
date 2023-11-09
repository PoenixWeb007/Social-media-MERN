import mongoose from "mongoose";
import express from "express";
import { loginController } from "../controllers/login.js";
import { registerController } from "../controllers/register.js";

export const authRouter = express.Router();
authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
