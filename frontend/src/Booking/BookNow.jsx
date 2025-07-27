// components/BookNow.jsx
import RoomSlider from "./RoomSlider";
import BookingForm from "./BookingForm";

const BookNow = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 gap-10">
      <h1 className="text-3xl font-bold text-center mt-6">Book Your Room</h1>
      <RoomSlider />
      <BookingForm />
    </div>
  );
};

export default BookNow;
