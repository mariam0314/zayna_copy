import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import Routes
import contactRoutes from "./Routes/Contact.js";
import chatRoutes from "./Routes/chat.js";
import bookingRoutes from "./Routes/Booking.js";
import guestRoutes from "./Routes/Guest.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.FRONTEND_URL.split(',');

// Use this CORS middleware before any routes
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(" Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json());

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'frontend', 'dist'), {
  setHeaders: function (res, filePath, stat) {
    // Set correct MIME types for JavaScript files
    if (filePath.endsWith('.js')) {
      res.set('Content-Type', 'text/javascript');
    } else if (filePath.endsWith('.mjs')) {
      res.set('Content-Type', 'text/javascript');
    } else if (filePath.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    } else if (filePath.endsWith('.json')) {
      res.set('Content-Type', 'application/json');
    }
  }
}));

// Serve additional static files from public directory
app.use('/public', express.static(path.join(__dirname, 'public'), {
  setHeaders: function (res, filePath, stat) {
    if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
      res.set('Content-Type', 'text/javascript');
    }
  }
}));

// API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/guest", guestRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🏨 Welcome to the Hotel Backend API!");
});

// Handle React routing, return index.html for any unmatched routes (must be last)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// });

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});