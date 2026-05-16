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
productRouter.get("/bestSellers", bestSellers);
productRouter.get("/newArrivals", newArrivals);
productRouter.get("/similar/:id", similarProducts);
productRouter.get("/", getProduct);
productRouter.get("/:id", productDetails);

export default productRouter;
