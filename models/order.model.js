// models/Order.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // aapka sequelize instance

const Order = sequelize.define("Order", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending", // pending, completed, cancelled etc.
  },
  // Shipping details
  shippingName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shippingPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shippingAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shippingCity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shippingPostalCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {});

// Associations
Order.associate = (models) => {
  Order.belongsTo(models.User, { foreignKey: "userId" });
  Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
};

export default Order;
