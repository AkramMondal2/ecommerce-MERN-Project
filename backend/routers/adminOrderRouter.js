import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { allOrder, deleteOrder, updateStatus } from "../controllers/adminOrderController.js";

const adminOrderRouter = express.Router();

adminOrderRouter.get("/", protect, admin, allOrder);
adminOrderRouter.put("/:id", protect, admin, updateStatus);
adminOrderRouter.delete("/:id", protect, admin, deleteOrder);

export default adminOrderRouter;
