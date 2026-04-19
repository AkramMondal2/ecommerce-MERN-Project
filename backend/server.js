import express from "express";
import dotenv from "dotenv/config.js";
import cors from "cors";
import connectdb from "./config/connectdb.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

connectdb();

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.listen(port, () => {
  console.log(`App listen on port http://localhost:${port}`);
});
