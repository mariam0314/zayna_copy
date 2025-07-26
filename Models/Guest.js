// Models/Guest.js
import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  roomNumber: { type: String, required: true },
  guestId: { type: String, required: true, unique: true },
  guestPassword: { type: String, required: true },
});

const Guest = mongoose.model("Guest", guestSchema);
export default Guest;
