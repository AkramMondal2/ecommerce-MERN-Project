import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createUser,
  deleteUser,
  getAllUser,
  updateUser,
} from "../controllers/adminControllers.js";

const adminRouter = express.Router();

//  (admin only)
adminRouter.get("/", protect, admin, getAllUser);
adminRouter.post("/", protect, admin, createUser);
adminRouter.put("/:id", protect, admin, updateUser);
adminRouter.delete("/:id", protect, admin, deleteUser);

export default adminRouter;
