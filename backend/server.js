import express from "express";
import dotenv from "dotenv/config.js";
import cors from "cors";
import connectdb from "./config/connectdb.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";
import checkoutRouter from "./routers/checkoutRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import subscriberRouter from "./routers/subscriberRouter.js";
import adminRouter from "./routers/adminRouter.js";
import productAdminRouter from "./routers/productAdminRouter.js";
import adminOrderRouter from "./routers/adminOrderRouter.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

connectdb();

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/subscriber", subscriberRouter);
app.use("/api/admin/users", adminRouter);
app.use("/api/admin/products", productAdminRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.listen(port, () => {
  console.log(`App listen on port http://localhost:${port}`);
});
