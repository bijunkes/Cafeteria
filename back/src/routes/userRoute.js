import express from "express";
import { getMe } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/me", authenticateToken, getMe);

export default userRouter;