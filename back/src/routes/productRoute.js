import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { authorizeAdmin } from "../middleware/role.js";
import { create, list, getProduct, update, deleteProduct } from "../controllers/productController.js";
import { upload } from "../../config/multer.js";

const productRouter = express.Router();

productRouter.get("/", list);
productRouter.get("/:id", getProduct);
productRouter.post("/", authenticateToken, authorizeAdmin, upload.single("image"), create);
productRouter.put("/:id", authenticateToken, authorizeAdmin, update);
productRouter.delete("/:id", authenticateToken, authorizeAdmin, deleteProduct);

export default productRouter;