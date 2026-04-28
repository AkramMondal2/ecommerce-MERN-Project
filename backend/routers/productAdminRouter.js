import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { allProduct } from "../controllers/productAdminController.js";

const productAdminRouter = express.Router();

// admin only
productAdminRouter.get("/", protect, admin, allProduct);

export default productAdminRouter;
