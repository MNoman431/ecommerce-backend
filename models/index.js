// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

import sequelize from "../config/db.js";
import Cart from "./cart.model.js";
import CartItem from "./cartItem.model.js";
import Product from "./product.model.js";
import User from "./user.model.js";
import Order from "./order.model.js";
import OrderItem from "./orderItem.model.js";

// Initialize models
const models = {
  User,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
};

// Call associate for each model if exists
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export default models;
