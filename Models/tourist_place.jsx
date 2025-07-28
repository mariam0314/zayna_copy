import React from "react";

const Tourist360 = () => {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-xl bg-white border border-gray-200">
      <iframe
        width="100%"
        height="100%"
        src="https://www.airpano.com/embed.php?3D=dubai-uae-best"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        scrolling="no"
        allowFullScreen
        title="Dubai 360 View"
      ></iframe>

      <div className="text-right text-xs p-2 bg-gray-50 text-gray-500">
        Courtesy of{" "}
        <a
          href="https://www.airpano.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          www.AirPano.com
        </a>
      </div>
    </div>
  );
};

export default Tourist360;
