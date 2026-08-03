// routes/auth.js
import express from "express";
import { Login } from "../controllers/AuthController.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Login route
router.post("/login", Login);

// Refresh route
router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ token: newAccessToken,user });
  });
});


// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // false for localhost
    sameSite: "strict",
  });
  res.json({ success: true, message: "Logged out" });
});


export default router;
