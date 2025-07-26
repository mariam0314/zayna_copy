import express from "express";
import Booking from "../Models/Booking.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router; 