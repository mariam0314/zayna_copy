import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// Import Routes (update to .ts if renamed)
import contactRoutes from "./Routes/Contact.js";
import chatRoutes from "./Routes/chat.js";
import bookingRoutes from "./Routes/Booking.js";
import guestRoutes from "./Routes/Guest.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.FRONTEND_URL.split(',');

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Handle React routing, return index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/guest", guestRoutes);

app.get("/", (req, res) => {
  res.send("🏨 Welcome to the Hotel Backend API!");
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});