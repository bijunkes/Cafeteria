import express from "express";
import { createOrder, getAllOrders } from "../controllers/orderController.js";
import { authenticateToken } from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getAllOrders);

export default orderRouter;