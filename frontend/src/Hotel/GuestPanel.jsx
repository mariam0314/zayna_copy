import React from "react";
import { useLocation } from "react-router-dom";

const GuestPanel = () => {
  const location = useLocation();
  const guest = location.state?.guest;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {guest?.name || "Guest"}!</h1>
      <p className="mb-2">Guest ID: {guest?.guestId}</p>
      <p className="mb-2">Room Number: {guest?.roomNumber}</p>
      <p className="mb-2">Phone: {guest?.phone}</p>
    </div>
  );
};

export default GuestPanel;
