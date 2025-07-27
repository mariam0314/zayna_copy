import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ChatBot from "./components/ChatBot";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Hotel/Home";
import About from "./Hotel/About";
import Contact from "./Hotel/Contact";
import BookNow from "./Booking/BookNow"; // ✅ FIXED PATH
import GuestPanel from "./Hotel/Guest"; 
import Guest from "./Hotel/GuestPanel";
// Scroll to top on route change
function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <ScrollToTopOnRouteChange />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<BookNow />} />
        <Route path="/guest" element={<GuestPanel />} />
        <Route path="/guest-panel" element={<GuestPanel />} /> {/* ✅ Add this */}

      </Routes>

      {/* Show footer on all pages except About */}
      {location.pathname !== "/about" && <Footer />}
      
      <ChatBot />
    </>
  );
}

export default App;
