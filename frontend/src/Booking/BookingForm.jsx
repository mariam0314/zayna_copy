import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", days: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/booking", formData);
      if (res.status === 201) {
        toast.success("Booking submitted successfully!");
        setFormData({ name: "", phone: "", email: "", days: "" });
      }
    } catch (err) {
      toast.error("Booking failed. Please try again!");
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl text-white w-full max-w-lg mx-auto space-y-4 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center">Book Your Stay</h2>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-2 bg-black border border-gray-700 rounded text-white" />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full p-2 bg-black border border-gray-700 rounded text-white" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 bg-black border border-gray-700 rounded text-white" />
        <input type="number" name="days" placeholder="Days of Stay" value={formData.days} onChange={handleChange} required className="w-full p-2 bg-black border border-gray-700 rounded text-white" />
        <button type="submit" className="bg-white text-black w-full py-2 rounded hover:bg-gray-300">Book Now</button>
      </form>
    </>
  );
};

export default BookingForm;
