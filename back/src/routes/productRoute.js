import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { authorizeAdmin } from "../middleware/role.js";
import { createProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", authenticateToken, authorizeAdmin, (req, res) => {
        return res.json({ message: "ADMIN OK" });
    });

export default productRouter;