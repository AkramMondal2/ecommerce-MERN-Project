import express from "express";
import {
  addToCart,
  getCartDetails,
  mergeGuestUser,
  removeFromCart,
  updateQuantity,
} from "../controllers/cartControllers.js";
import productSchema from "../models/productSchema.js";
import { protect } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/", addToCart);
cartRouter.put("/", updateQuantity);
cartRouter.delete("/", removeFromCart);
cartRouter.get("/", getCartDetails);
cartRouter.post("/merge",protect, mergeGuestUser);

export default cartRouter;
