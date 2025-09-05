
import models from "../models/index.js";
const { Cart, CartItem, Product, Order, OrderItem, User } = models;

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's cart
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });
    if (cartItems.length === 0) return res.status(400).json({ message: "Cart is empty" });

    // Calculate total
    let totalAmount = 0;
    for (let item of cartItems) {
      const product = await Product.findByPk(item.productId);
      totalAmount += product.price * item.quantity;
    }

    // Create Order
    const order = await Order.create({ userId, totalAmount, status: "Pending" });

    // Create OrderItems
    for (let item of cartItems) {
      const product = await Product.findByPk(item.productId);
      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Clear cart
    await CartItem.destroy({ where: { cartId: cart.id } });

    return res.status(200).json({ message: "Order placed", orderId: order.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: OrderItem, include: [Product] }],
    });
    return res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Admin: get all users' orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email", "role"] },
        { model: OrderItem, include: [Product] },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
