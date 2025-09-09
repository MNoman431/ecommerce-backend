// // // models/Order.js
// // import { DataTypes } from "sequelize";
// // import sequelize from "../config/db.js"; // aapka sequelize instance

// // const Order = sequelize.define("Order", {
// //   userId: {
// //     type: DataTypes.INTEGER,
// //     allowNull: false,
// //   },
// //   totalAmount: {
// //     type: DataTypes.FLOAT,
// //     allowNull: false,
// //     defaultValue: 0,
// //   },
// //   status: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //     defaultValue: "pending", // pending, completed, cancelled etc.
// //   },
// //   // Shipping details
// //   shippingName: {
// //     type: DataTypes.STRING,
// //     allowNull: true,
// //   },
// //   shippingPhone: {
// //     type: DataTypes.STRING,
// //     allowNull: true,
// //   },
// //   shippingAddress: {
// //     type: DataTypes.STRING,
// //     allowNull: true,
// //   },
// //   shippingCity: {
// //     type: DataTypes.STRING,
// //     allowNull: true,
// //   },
// //   shippingPostalCode: {
// //     type: DataTypes.STRING,
// //     allowNull: true,
// //   },
// // }, {});

// // // Associations
// // Order.associate = (models) => {
// //   Order.belongsTo(models.User, { foreignKey: "userId" });
// //   Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
// // };

// // export default Order;

// // models/Order.js
// import { DataTypes } from "sequelize";
// import sequelize from "../config/db.js";

// const Order = sequelize.define("Order", {
//   userId: { type: DataTypes.INTEGER, allowNull: false },
//   totalAmount: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
//   status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },

//   // Personal Information
//   fullName: { type: DataTypes.STRING, allowNull: false },
//   phoneNumber: { type: DataTypes.STRING, allowNull: false },
//   email: { type: DataTypes.STRING, allowNull: false },

//   // Delivery Information
//   address: { type: DataTypes.STRING, allowNull: false },
//   city: { type: DataTypes.STRING, allowNull: false },
//   postalCode: { type: DataTypes.STRING, allowNull: false },
//   country: { type: DataTypes.STRING, allowNull: false },

//   // Payment
//   paymentMethod: {
//     type: DataTypes.ENUM("COD", "Bank Transfer", "Card"),
//     allowNull: false,
//     defaultValue: "COD",
//   },
// }, {});

// Order.associate = (models) => {
//   Order.belongsTo(models.User, { foreignKey: "userId" });
//   Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
// };

// export default Order;


// success or failure
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define(
  "Order",
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },

    // Personal Information
    fullName: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },

    // Delivery Information
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },

    // Payment
    paymentMethod: {
      type: DataTypes.ENUM("COD", "Bank Transfer", "Card"),
      allowNull: false,
      defaultValue: "COD",
    },

    // Stripe Session
    stripeSessionId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {}
);

Order.associate = (models) => {
  Order.belongsTo(models.User, { foreignKey: "userId" });
  Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
};

export default Order;

