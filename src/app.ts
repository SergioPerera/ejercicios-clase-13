import express from "express";
import "./db/mongoose.js";
import { userRouter } from "./routers/user.js";
import { productRouter } from "./routers/products.js";



export const app = express();
app.use(express.json());
app.use(userRouter);
app.use(productRouter);


