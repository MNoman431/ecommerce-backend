import sequelize from "../config/db.js";
import Product from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";


export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Cloudinary stream upload
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" }, 
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      imageUrl: uploadResult.secure_url,
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("AddProduct Error:", error);
    res.status(500).json({ message: error.message });
  }
};



// ✅ Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // Case-insensitive search for MySQL
    const products = await Product.findAll({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("category")),
        category.toLowerCase()
      ),
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, imageUrl } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.update({ name, description, price, stock, category, imageUrl });
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
