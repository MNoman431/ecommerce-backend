import express from "express";
import { placeOrder, getOrders } from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", placeOrder); // Place order
router.get("/", getOrders);   // Get user's orders

export default router;
