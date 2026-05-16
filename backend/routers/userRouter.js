import express from "express";
import { getMe, login, logout, register } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/me", protect, getMe);

export default userRouter;
