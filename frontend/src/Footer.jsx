import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import ZaynaLogo from "./assets/ZaynaLogo.png"; // ✅ Correct path!

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white px-6 md:px-20 py-10 text-sm font-light">
      {/* Top Row: Logos */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
        <img src={ZaynaLogo} alt="Logo 1" className="h-40" />
      </div>

      {/* Bottom Row: Info Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        <div>
          <h3 className="text-lg font-semibold border-b border-white/30 mb-4 inline-block">ADDRESS</h3>
          <p>
            Dubai AL sahara road
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b border-white/30 mb-4 inline-block">CONTACT</h3>
          <p>Tel : +662-2610405</p>
          <p>Fax : +662-2610407</p>
          <p>Email : <a href="mailto:info@thee20.com" className="underline">info@thee20.com</a></p>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b border-white/30 mb-4 inline-block">FOLLOW US</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-2 text-xl">
            <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-400"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-white/60">
        © 2022–2025 THEE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
