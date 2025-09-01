
import sequelize from "../config/db.js";
import Product from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

// ✅ Add Product
export const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category } = req.body;

  if (!req.file) {
    throw new ApiError(400, "Image file is required");
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

  res
    .status(201)
    .json(new ApiResponse(201, product, "Product added successfully"));
});

// ✅ Get all products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll();
  res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

// ✅ Get single product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) throw new ApiError(404, "Product not found");

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

// ✅ Get products by category
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const products = await Product.findAll({
    where: sequelize.where(
      sequelize.fn("LOWER", sequelize.col("category")),
      category.toLowerCase()
    ),
  });

  res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched by category"));
});

// ✅ Update Product
// export const updateProduct = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price, stock, category, imageUrl } = req.body;

//   const product = await Product.findByPk(id);
//   if (!product) throw new ApiError(404, "Product not found");

//   await product.update({ name, description, price, stock, category, imageUrl });

//   res
//     .status(200)
//     .json(new ApiResponse(200, product, "Product updated successfully"));
// });


export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category } = req.body;

  const product = await Product.findByPk(id);
  if (!product) throw new ApiError(404, "Product not found");

  let imageUrl = product.imageUrl; // default: purani image

  // Agar nayi image aayi hai to upload karo
  if (req.file) {
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
    imageUrl = uploadResult.secure_url;
  }

  await product.update({ name, description, price, stock, category, imageUrl });

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully"));
});


// ✅ Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) throw new ApiError(404, "Product not found");

  await product.destroy();
  res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"));
});

// Get total products count
export const getTotalProducts = async (req, res) => {
  try {
    const count = await Product.count();

    res.status(200).json({
      statusCode: 200,
      data: count,
      message: "Total products fetched successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      data: null,
      message: error.message,
      success: false,
    });
  }
};
