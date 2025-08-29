
import express from "express";
import { dbConnection } from "./config/db.js";
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"

const app = express();

// Middleware
app.use(express.json());



app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
dbConnection();

export default app;

