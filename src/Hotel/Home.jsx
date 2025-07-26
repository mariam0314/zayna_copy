import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    if (direction === "right") {
      if (currentScroll + scrollAmount >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      if (currentScroll <= 10) {
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          src="https://media.istockphoto.com/id/146765403/photo/a-luxurious-florida-beach-hotel-during-sunrise.jpg?s=612x612&w=0&k=20&c=pxw9Q78KbvqV6_pS_C-v_m6S_WQjKWLBSdqgRtqMUUg="
          alt="Zayna Hotel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
          <motion.h1
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 10 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-xl"
          >
            Welcome to <span className="text-white">Zayna Hotel</span>
          </motion.h1>
          <motion.p
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
          >
            Experience unmatched luxury, comfort, and elegance in the heart of the city.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-300 transition"
            onClick={() => navigate("/book")}
          >
            Book Now
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="mt-10 text-white"
          >
            <ChevronDown size={32} className="animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* SUITES SECTION */}
      <SectionBlock
        title="World-Class Rooms & Suites"
        description="Experience beautifully appointed rooms with refined comfort and breathtaking views that define luxury living."
        image="https://i.pinimg.com/1200x/a3/8c/11/a38c11d9dd42ccfa96b4121fd62a4fde.jpg"
      />

      {/* DINING SECTION */}
      <section className="bg-black py-20 px-6 md:px-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Exquisite Dining Options</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            You will never struggle to find the perfect meal at Zayna with each resort boasting restaurants from numerous world-renowned Michelin Star chefs.
          </p>
          <button className="mt-6 px-6 py-2 bg-white text-black rounded hover:bg-gray-300 transition">EXPLORE</button>
        </div>

        <div className="relative flex items-center">
          <button onClick={() => scroll("left")} className="absolute left-0 z-10 bg-white text-black p-2 rounded-full shadow-md hover:scale-105 transition" style={{ top: "50%", transform: "translateY(-50%)" }}>
            <ChevronLeft size={28} />
          </button>

          <div ref={scrollRef} className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth snap-x px-12 w-full">
            {[
              "https://i.pinimg.com/1200x/03/6b/fa/036bfab6f5a5bc86c019058d395b8875.jpg",
              "https://i.pinimg.com/736x/3a/78/81/3a78811ee6f53ed964ae66da0f7e1aa5.jpg",
              "https://i.pinimg.com/1200x/31/bd/88/31bd88cc2c87124bc29a9009609be881.jpg",
              "https://i.pinimg.com/736x/60/54/ab/6054abdc48b22ec3ce31e5d6e3121147.jpg",
              "https://assets.kerzner.com/api/public/content/13bc43bff50946f58a5abff64bf20e5e?v=c6d88d83&t=w992",
              "https://assets.kerzner.com/api/public/content/7506f0ea00814820a5e0e1ce19a322e4?v=94a0a60d&t=w992",
              "https://assets.kerzner.com/api/public/content/9440cd969c0848ae906e14d25b70ae68?v=678242a8&t=w992",
              "https://i.pinimg.com/1200x/ea/73/d7/ea73d74d8a2653f89b976824d1038bca.jpg",
            ].map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: i * 0.2 }} viewport={{ once: true }} className="min-w-[300px] md:min-w-[400px] flex-shrink-0 snap-center">
                <img src={src} alt={`Dish ${i + 1}`} className="rounded-lg shadow-lg object-cover w-full h-72" />
              </motion.div>
            ))}
          </div>

          <button onClick={() => scroll("right")} className="absolute right-0 z-10 bg-white text-black p-2 rounded-full shadow-md hover:scale-105 transition" style={{ top: "50%", transform: "translateY(-50%)" }}>
            <ChevronRight size={28} />
          </button>
        </div>
      </section>

      {/* ENTERTAINMENT SECTION */}
      <SectionBlock
        title="Non-Stop Entertainment"
        description="Enjoy vibrant nightlife, live music, and immersive experiences that keep the energy alive all day long."
        image="https://i.pinimg.com/1200x/82/0b/62/820b626b861fdaf62365400c83b3217c.jpg"
        reverse
      />

      {/* SPA SECTION */}
      <SectionBlock
        title="Exclusive Wellness & Spa"
        description="Indulge in holistic therapies designed to rejuvenate your body and soul in a serene, private sanctuary."
        image="https://i.pinimg.com/1200x/c6/c8/f2/c6c8f2954f7adbc9194ffd390e38e8bf.jpg"
      />
    </>
  );
};

const SectionBlock = ({ title, description, image, reverse }) => (
  <section className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center bg-black text-white py-16 px-6 md:px-20 gap-10`}>
    <motion.div
      initial={{ x: reverse ? 100 : -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="md:w-1/2"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <p className="text-gray-300 text-lg leading-relaxed mb-6">{description}</p>
      <button className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition duration-300">
        Explore
      </button>
    </motion.div>

    <motion.div
      initial={{ x: reverse ? -100 : 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="md:w-1/2"
    >
      <img src={image} alt={title} className="rounded-lg shadow-xl w-full" />
    </motion.div>
  </section>
);

export default HeroSection;
