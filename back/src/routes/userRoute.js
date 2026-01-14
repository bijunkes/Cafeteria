import express from "express";
import { getMe, updateMe } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/me", authenticateToken, getMe);
userRouter.put("/me", authenticateToken, updateMe);

export default userRouter;