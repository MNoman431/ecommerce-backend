
import express from "express";
import { dbConnection } from "./config/db.js";
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware.js"
import cors from "cors";
const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());  

// ✅ Allow frontend origin
app.use(cors({
  origin: "http://localhost:5173", // frontend ka URL
  credentials: true // agar cookies/jwt bhejna hai
}));

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
dbConnection();
app.use(errorHandler);


export default app;

