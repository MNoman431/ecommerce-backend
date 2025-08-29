
import express from "express";
import { dbConnection } from "./config/db.js";
import userRoutes from "./routes/user.route.js"

const app = express();

// Middleware
app.use(express.json());



app.use("/api/user", userRoutes);
dbConnection();

export default app;

