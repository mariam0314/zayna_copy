// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import Routes
import contactRoutes from "./Routes/Contact.js";
import chatRoutes from "./Routes/chat.js";
import bookingRoutes from "./Routes/Booking.js";
import guestRoutes from "./Routes/Guest.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Adjusted CORS settings here


// Use this CORS middleware before any routes
app.use(cors({
  origin: ['http://localhost:5173', 'https://zayna.wuaze.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/guest", guestRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("🏨 Welcome to the Hotel Backend API!");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
