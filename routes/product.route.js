import express from "express";
import {
    addProduct,
    getProducts,
    getProductById,
    getProductsByCategory,
    updateProduct,
    deleteProduct,
    getTotalProducts,
} from "../controllers/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();
// Create product (with image)
// router.post("/", authMiddleware,adminMiddleware, upload.single("image"), addProduct);
router.post("/",  upload.single("image"), addProduct);

// CRUD routes
router.get("/count", getTotalProducts);
router.get("/", getProducts);                 // Read all
router.get("/:id", getProductById);          // Read single by ID
router.get("/category/:category", getProductsByCategory); // Read by category
// router.put("/:id", authMiddleware,adminMiddleware, updateProduct);        // Update
// router.put("/:id", authMiddleware, adminMiddleware, upload.single("image"), updateProduct);  
router.patch("/:id",  upload.single("image"), updateProduct);  
// router.delete("/:id", authMiddleware,adminMiddleware, deleteProduct);    // Delete
router.delete("/:id",  deleteProduct);    // Delete


export default router;
