import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Test each route one by one - comment out the problematic ones
try {
  console.log('Loading Contact routes...');
  const contactRoutes = await import("./Routes/Contact.js");
  app.use("/api/contact", contactRoutes.default);
  console.log('✅ Contact routes loaded');
} catch (error) {
  console.log('❌ Error loading Contact routes:', error.message);
}

try {
  console.log('Loading Chat routes...');
  const chatRoutes = await import("./Routes/chat.js");
  app.use("/api/chat", chatRoutes.default);
  console.log('✅ Chat routes loaded');
} catch (error) {
  console.log('❌ Error loading Chat routes:', error.message);
}

try {
  console.log('Loading Booking routes...');
  const bookingRoutes = await import("./Routes/Booking.js");
  app.use("/api/booking", bookingRoutes.default);
  console.log('✅ Booking routes loaded');
} catch (error) {
  console.log('❌ Error loading Booking routes:', error.message);
}

try {
  console.log('Loading Guest routes...');
  const guestRoutes = await import("./Routes/Guest.js");
  app.use("/api/guest", guestRoutes.default);
  console.log('✅ Guest routes loaded');
} catch (error) {
  console.log('❌ Error loading Guest routes:', error.message);
}

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Debug server running" });
});

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
  console.log(`🚀 Debug server running at http://localhost:${PORT}`);
});