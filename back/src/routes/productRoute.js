import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { authorizeAdmin } from "../middleware/role.js";
import { create, list, getProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", list);
productRouter.get("/:id", getProduct);
productRouter.post("/", authenticateToken, authorizeAdmin, create);

export default productRouter;