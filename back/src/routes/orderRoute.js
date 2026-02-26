import express from "express";
import { createOrder, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { authenticateToken } from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/", authenticateToken, createOrder);
orderRouter.get("/", getAllOrders);
orderRouter.patch("/:id/status", updateOrderStatus);

export default orderRouter;