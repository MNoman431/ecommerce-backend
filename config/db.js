// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config(); // load .env file

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     logging: false, // disable raw SQL logs
//     // logging: console.log, // ✅ SQL queries console me print hongi
//   }
// );

// // ✅ Connection check function
// export const dbConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Database connected successfully");
//   } catch (error) {
//     console.error("❌ DB connection failed:", error);
//   }
// };



// export default sequelize;


import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load .env

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      // Vercel serverless may need SSL false
      ssl: {
        rejectUnauthorized: false,
      },
    },
    logging: false, // disable SQL logs
  }
);

// ✅ Test connection
export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
};

export default sequelize; // default export
