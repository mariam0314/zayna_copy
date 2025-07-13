// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  const linkGroups = [
    {
      title: "ZAYNA",
      links: ["Rooms & Suites", "Dining", "Wellness", "Entertainment"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Privacy Policy", "Terms of Use"],
    },
    {
      title: "Explore",
      links: ["Contact", "Blog", "FAQ", "Support"],
    },
  ];

  return (
    <footer className="bg-black text-white pt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {linkGroups.map((group, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-lg mb-4">{group.title}</h4>
              <ul className="space-y-2 text-sm">
                {group.links.map((label) => (
                  <li key={label}>
                    <a
                      href="#!"
                      className="text-white hover:text-gray-300 hover:underline transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 pb-8">
          <span>
            © {new Date().getFullYear()} Zayna International Limited. All rights
            reserved.
          </span>
          <div className="mt-4 md:mt-0 space-x-4">
            <a
              href="#!"
              className="text-white hover:text-gray-300 hover:underline transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#!"
              className="text-white hover:text-gray-300 hover:underline transition-colors"
            >
              Terms of Use
            </a>
            <a
              href="#!"
              className="text-white hover:text-gray-300 hover:underline transition-colors"
            >
              Site Map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
