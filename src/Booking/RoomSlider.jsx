import { useState } from "react";

const images = [
  "https://i.pinimg.com/1200x/7a/3f/c9/7a3fc9e09a7b3287f18c4304fad00c8f.jpg",
  "https://i.pinimg.com/1200x/e9/c8/91/e9c8916eb1f32e38a862fd9adfac745e.jpg",
  "https://i.pinimg.com/1200x/58/aa/fd/58aafdc19948bfa95b60c7d4efdc59d8.jpg",
  "https://i.pinimg.com/1200x/f1/ca/ab/f1caab3389c41075a7ef5fbee5e3e999.jpg",
  "https://i.pinimg.com/1200x/77/7c/cf/777ccf6a407946909add8bdf7b85cdc4.jpg",
  "https://i.pinimg.com/1200x/18/df/86/18df8673b9f60793a85df1ca8b8afed9.jpg",
  "https://i.pinimg.com/1200x/82/02/c5/8202c523bc3d9edbbafd3bca08a911d5.jpg",
  // ➕ Add more image URLs as needed
];

const RoomSlider = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-4xl h-72 md:h-96 overflow-hidden rounded-xl shadow-lg">
      <img
        src={images[index]}
        alt={`Room ${index + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl font-bold bg-black/50 p-2 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl font-bold bg-black/50 p-2 rounded-full"
      >
        ❯
      </button>
    </div>
  );
};

export default RoomSlider;
