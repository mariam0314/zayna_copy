import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./assets/ZaynaLogo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-90 shadow-md" : "bg-transparent"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo Image */}
        <div className="flex items-center space-x-2">
          <img
            src={Logo}
            alt="Zayna Logo"
            className="h-12 w-auto object-contain rounded-md shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#home" className="text-white hover:text-gray-300 transition">Home</a>
          <a href="#about" className="text-white hover:text-gray-300 transition">About</a>
          <a href="#contact" className="text-white hover:text-gray-300 transition">Contact</a>
          <button className="ml-4 px-5 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
            Guest Panel
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black bg-opacity-90 px-4 pb-4"
        >
          <a href="#home" className="block py-2 text-white hover:text-gray-300 transition">Home</a>
          <a href="#about" className="block py-2 text-white hover:text-gray-300 transition">About</a>
          <a href="#contact" className="block py-2 text-white hover:text-gray-300 transition">Contact</a>
          <button className="w-full mt-3 px-4 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
            Book Now
          </button>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
