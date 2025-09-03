// utils/generateToken.js
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const jwtt= jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  console.log(jwt)
  return jwtt;
};

export default generateToken;
