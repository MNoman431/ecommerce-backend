import { Model, DataTypes } from "sequelize";
import sequelize  from "../config/db.js";

class User extends Model {}

User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;  // ✅ ab default export available hai
