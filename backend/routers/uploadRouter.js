import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import upload from "../middleware/uploadMiddleware.js";

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("image"), uploadImage);

export default uploadRouter;
