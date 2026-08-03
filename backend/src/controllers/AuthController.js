import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Short-lived access token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    

    // Long-lived refresh token
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role,profilePicture:user.profilePicture },
      process.env.JWT_REFRESH_SECRET,
      
    );
   

// Store refresh token in HttpOnly cookie
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // false for localhost
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
});



    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: accessToken,
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
      console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
