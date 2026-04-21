import express from "express";
import { finalize, newCheckout, pay } from "../controllers/checkoutControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const checkoutRouter = express.Router();

checkoutRouter.post("/", protect, newCheckout);
checkoutRouter.put("/pay", protect, pay);
checkoutRouter.post("/finalize/:id", protect, finalize);

export default checkoutRouter;
