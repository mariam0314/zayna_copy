import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GuestPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const guest = location.state?.guest || JSON.parse(localStorage.getItem("guestInfo"));
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [touristPlaces, setTouristPlaces] = useState([]);

  const sectionAnim = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  useEffect(() => {
    // Dummy tourist places (replace with MongoDB or API as needed)
    setTouristPlaces([
      {
        title: "Burj Khalifa",
        img: "https://i.pinimg.com/736x/2f/9c/5b/2f9c5b27cc16bfe6d38a00f9873e0cfa.jpg",
        desc: "The world's tallest building with stunning panoramic views.",
      },
      {
        title: "Palm Jumeirah",
        img: "https://source.unsplash.com/800x400/?dubai,palm",
        desc: "Iconic man-made archipelago with luxury resorts.",
      },
      {
        title: "Dubai Frame",
        img: "https://source.unsplash.com/800x400/?dubai,frame",
        desc: "A unique landmark offering views of old and new Dubai.",
      },
    ]);

    // Weather API (OpenWeatherMap)
    axios
      .get(`https://api.open-meteo.com/v1/forecast?latitude=25.276987&longitude=55.296249&current_weather=true`)
      .then(res => setWeather(res.data.current_weather))
      .catch(err => console.error("Weather Error:", err));

    // News API (mocked)
    setNews([
      { title: "Dubai Expo Wraps Up Successfully", url: "#" },
      { title: "Top 5 Tourist Spots Trending Now", url: "#" },
    ]);
  }, []);

  if (!guest) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700 mb-6 text-lg">Please login to view your guest panel.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <style>{`
        .slick-prev, .slick-next {
          width: 40px;
          height: 40px;
          z-index: 10;
        }
        .slick-prev:before, .slick-next:before {
          font-size: 30px;
          color: black;
          opacity: 0.7;
        }
        .slick-prev:hover:before, .slick-next:hover:before {
          opacity: 1;
        }
        .slick-dots li button:before {
          color: black;
          font-size: 12px;
        }
        .slick-dots li.slick-active button:before {
          color: #1a202c;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionAnim}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Welcome, {guest.name}!
          </h1>
          <p className="text-xl text-gray-600 mt-3">
            Guest ID: {guest.guestId} | Room: {guest.roomNumber}
          </p>
        </motion.div>

        {/* Weather + News */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <motion.div
            variants={sectionAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 bg-gray-50 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">🌤️ Dubai Live Weather</h2>
            {weather ? (
              <div className="text-lg text-gray-700">
                <p className="mb-2">
                  <span className="font-medium">Temperature:</span> {weather.temperature}°C
                </p>
                <p>
                  <span className="font-medium">Wind Speed:</span> {weather.windspeed} km/h
                </p>
              </div>
            ) : (
              <p className="text-gray-600">Loading weather...</p>
            )}
          </motion.div>
          <motion.div
            variants={sectionAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 bg-gray-50 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">📰 Dubai News</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-3">
              {news.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.url}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-200"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Tourist Places Slider */}
        <motion.section
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-6 border-b-2 border-gray-200 pb-3">🌍 Explore Dubai</h2>
          <Slider {...sliderSettings}>
            {touristPlaces.map((place, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center px-6"
              >
                <img
                  src={place.img}
                  alt={place.title}
                  className="rounded-2xl shadow-lg mb-4 w-full h-96 object-cover"
                />
                <h3 className="text-2xl font-semibold text-gray-900">{place.title}</h3>
                <p className="text-gray-600 mt-2">{place.desc}</p>
              </motion.div>
            ))}
          </Slider>
        </motion.section>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => {
              localStorage.removeItem("guestToken");
              localStorage.removeItem("guestInfo");
              navigate("/");
            }}
            className="px-8 py-3 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-all duration-300"
          >
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default GuestPanel;