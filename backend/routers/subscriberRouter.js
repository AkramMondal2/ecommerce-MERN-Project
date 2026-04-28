import express from "express";
import { subscriber } from "../controllers/subscriberController.js";

const subscriberRouter = express.Router();

subscriberRouter.post("/", subscriber);

export default subscriberRouter;
