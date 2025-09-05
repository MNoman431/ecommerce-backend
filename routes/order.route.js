import express from "express";
import { placeOrder, getOrders, getAllOrders, getOrdersCount } from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", placeOrder); // Place order
router.get("/", getOrders);   // Get user's orders
router.get("/all", adminMiddleware, getAllOrders); // Admin: get all orders
router.get("/count", adminMiddleware, getOrdersCount); // Admin: orders count

export default router;
