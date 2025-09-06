// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import generateToken from "../utils/jwt.js";

// // ✅ Register User
// export const registerUser = async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;

//         // check if user exists
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // create user
//         const newUser = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//             role
//         });

//         res.status(201).json({
//             message: "User registered successfully",
//             user: { id: newUser.id, name: newUser.name, email: newUser.email }
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong", error: error.message });
//     }
// };

// // ✅ Login User
// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // find user
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // check password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // generate token
//         const token = generateToken({ id: user.id, role: user.role });
//          res.cookie("token", token, {
//       httpOnly: true,   // prevents XSS attacks
//       secure: false,    // set true if using https
//       maxAge: 24 * 60 * 60 * 1000 // 1 day
//     });

//         res.status(200).json({
//             message: "Login successful",
//             token,
//             user: { id: user.id, name: user.name, email: user.email }
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong", error: error.message });
//     }
// };



// // logout user
// export const logoutUser = (req, res) => {
//   res.clearCookie("token");  // clear token cookie
//   res.status(200).json({ message: "Logout successful" });
// };



import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

// ✅ Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // check if user exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new ApiError(400, "User already exists");

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json(
    new ApiResponse(
      201,
      { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      "User registered successfully"
    )
  );
});

// ✅ Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // find user
  const user = await User.findOne({ where: { email } });
  if (!user) throw new ApiError(400, "Invalid credentials");

  // check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(400, "Invalid credentials");

  // generate token
  const token = generateToken({ id: user.id, role: user.role });

  // set cookie
  // res.cookie("token", token, {
  //   httpOnly: true, // prevents XSS attacks
  //   secure: false, // set true if using https
  //   maxAge: 24 * 60 * 60 * 1000, // 1 day
  // });
  res.cookie("token", token, {
  httpOnly: true,
  secure: false, // localhost
  sameSite: "lax", // ✅ important
  maxAge: 24 * 60 * 60 * 1000
});


  res.status(200).json(
    new ApiResponse(
      200,
      { id: user.id, name: user.name, email: user.email, token,role:user.role },
      "Login successful"
    )
  );
});

// ✅ Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token"); // clear token cookie
  res.status(200).json(new ApiResponse(200, null, "Logout successful"));
});
