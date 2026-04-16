import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  bestSellers,
  createProduct,
  deleteProduct,
  getProduct,
  newArrivals,
  productDetails,
  similarProducts,
  updateProduct,
} from "../controllers/productControllers.js";

const productRouter = express.Router();

productRouter.post("/", protect, admin, createProduct);
productRouter.put("/:id", protect, admin, updateProduct);
productRouter.delete("/:id", protect, admin, deleteProduct);
productRouter.get("/bestSellers", protect, admin, bestSellers);
productRouter.get("/newArrivals", protect, admin, newArrivals);
productRouter.get("/similar/:id", protect, admin, similarProducts);
productRouter.get("/", protect, admin, getProduct);
productRouter.get("/:id", protect, admin, productDetails);

export default productRouter;
