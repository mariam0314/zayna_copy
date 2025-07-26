import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  days: Number,
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking; 