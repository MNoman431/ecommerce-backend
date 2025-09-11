
// import express from "express";
// import { dbConnection } from "./config/db.js";
// import userRoutes from "./routes/user.route.js";
// import productRoutes from "./routes/product.route.js";
// import cartRoutes from "./routes/cart.route.js";
// import orderRoutes from "./routes/order.route.js";
// import paymentRoutes from "./routes/payment.route.js";
// import searchRoutes from "./routes/search.routes.js";
// import { stripeWebhook } from "./controllers/payment.controller.js";
// import cookieParser from "cookie-parser";
// import errorHandler from "./middleware/error.middleware.js";
// import cors from "cors";

// const app = express();

// // ⚡ Webhook route must be defined before JSON middleware to access raw body
// app.post("/api/payment/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// // ✅ Regular routes use JSON parser
// app.use(express.json());
// app.use(cookieParser());  

// // ✅ Allow frontend origin
// app.use(cors({
//   origin:"https://fancytopcovers.vercel.app", // frontend URL
//   credentials: true // for cookies/jwt
// }));

// // ✅ Routes
// app.use("/api/user", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use('/api/search', searchRoutes);

// dbConnection();
// app.use(errorHandler);

// export default app;









import express from "express";
import { dbConnection } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";
import paymentRoutes from "./routes/payment.route.js";
import searchRoutes from "./routes/search.routes.js";
import { stripeWebhook } from "./controllers/payment.controller.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware.js";
import cors from "cors";

const app = express();

// ⚡ Webhook route must be defined before JSON middleware to access raw body
app.post("/api/payment/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// ✅ Regular routes use JSON parser
app.use(express.json());
app.use(cookieParser());

// ✅ Allow multiple frontend origins (Vercel + Localhost)
const allowedOrigins = [
  "https://fancytopcovers.vercel.app", // deployed frontend
  "http://localhost:5173"              // local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / Thunder Client
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error("CORS policy: Not allowed by server"), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// ✅ Routes
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/search", searchRoutes);

dbConnection();
app.use(errorHandler);

export default app;
