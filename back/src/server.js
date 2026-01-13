import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.send("api rodando");
});

app.listen(3000, () => {
    console.log("servidor lisinho");
});