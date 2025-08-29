import express from "express";
import {
    addProduct,
    getProducts,
    getProductById,
    getProductsByCategory,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";



const router = express.Router();

// CRUD routes
router.post("/", authMiddleware, addProduct); // Create
router.get("/", getProducts);                 // Read all
router.get("/:id", getProductById);          // Read single by ID
router.get("/category/:category", getProductsByCategory); // Read by category
router.put("/:id", authMiddleware, updateProduct);        // Update
router.delete("/:id", authMiddleware, deleteProduct);    // Delete

export default router;
