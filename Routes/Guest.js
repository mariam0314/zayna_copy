// Routes/Guest.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Guest from "../Models/Guest.js";

const router = express.Router();

// 🔐 Secret key for JWT (store in .env ideally)
const JWT_SECRET = process.env.JWT_SECRET || "zayna_secret";

// ✅ Guest Registration Route
router.post("/register", async (req, res) => {
  try {
    const { name, phone, roomNumber } = req.body;

    console.log("📥 Guest Register Request:", req.body);

    // Generate guest ID and random password
    const guestId = "ZAYNA" + Math.floor(Math.random() * 100000);
    const guestPassword = Math.random().toString(36).substring(2, 10);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(guestPassword, salt);

    const newGuest = new Guest({
      name,
      phone,
      roomNumber,
      guestId,
      guestPassword: hashedPassword,
    });

    await newGuest.save();

    res.status(201).json({ guestId, password: guestPassword });
  } catch (err) {
    console.error("❌ Guest registration error:", err);
    if (err.code === 11000) {
      res.status(400).json({ error: "Phone number already exists" });
    } else {
      res.status(500).json({ error: "Registration failed. Please try again." });
    }
  }
});

// ✅ Guest Login Route
router.post("/login", async (req, res) => {
  const { guestId, password } = req.body;

  console.log("🔐 Login Attempt:", guestId);

  try {
    const guest = await Guest.findOne({ guestId });

    if (!guest) {
      return res.status(401).json({ error: "Invalid Guest ID or Password" });
    }

    const isMatch = await bcrypt.compare(password, guest.guestPassword);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Guest ID or Password" });
    }

    // Generate JWT token
    const token = jwt.sign({ guestId: guest.guestId }, JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({
      token,
      guest: {
        name: guest.name,
        phone: guest.phone,
        roomNumber: guest.roomNumber,
        guestId: guest.guestId,
      },
    });
  } catch (err) {
    console.error("❌ Guest login error:", err);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

export default router;
