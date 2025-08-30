
import express from "express";
import { dbConnection } from "./config/db.js";
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware.js"
const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());  

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
dbConnection();
app.use(errorHandler);

export default app;

