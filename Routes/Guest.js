// Routes/Guest.js
import express from "express";
import Guest from "../Models/Guest.js";

const router = express.Router();

// ✅ Guest Registration Route
router.post("/register", async (req, res) => {
  try {
    const { name, phone, roomNumber } = req.body;

    console.log("📥 Guest Register Request:", req.body);

    const guestId = "ZAYNA" + Math.floor(Math.random() * 100000);
    const guestPassword = Math.random().toString(36).substring(2, 10);

    const newGuest = new Guest({
      name,
      phone,
      roomNumber,
      guestId,
      guestPassword,
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

    if (!guest || guest.guestPassword !== password) {
      return res.status(401).json({ error: "Invalid Guest ID or Password" });
    }

    res.status(200).json({
      name: guest.name,
      phone: guest.phone,
      roomNumber: guest.roomNumber,
      guestId: guest.guestId,
    });
  } catch (err) {
    console.error("❌ Guest login error:", err);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

export default router;
