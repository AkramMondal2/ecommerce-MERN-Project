import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { myOrders, orderById } from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.get("/myorders", protect, myOrders);
orderRouter.get("/:id", protect, orderById);

export default orderRouter;
