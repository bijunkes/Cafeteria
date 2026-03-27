import express from "express";
import { register, login, recoverPassword, resetPassword } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/recover-password", recoverPassword);
authRouter.post("/reset-password", resetPassword);

export default authRouter;