import React from 'react';

/**
 * BhumiSathi (ভূমিসাথী) Official Logo Component
 * Rendered from the user's reference image with crisp vector geometry.
 */
export default function BhumiSathiLogo({ className = "w-10 h-10", size = 40 }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center bg-white dark:bg-[#131c27] rounded-xl shadow-md border border-gray-200/80 dark:border-gray-700/80 p-1.5 flex-shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Slanted Golden Ochre Bar */}
        <path
          d="M 16 46 C 14 46 12 48 13 50 L 16 62 C 17 64 19 66 21 66 L 42 66 C 44 66 46 64 45 62 L 42 50 C 41 48 39 46 37 46 Z"
          fill="#c59b27"
        />

        {/* Bold Modern Green Checkmark */}
        <path
          d="M 24 74 L 38 74 C 42 74 45 72 47 69 L 84 22 C 86 19 84 16 80 16 L 68 16 C 65 16 62 18 60 21 L 39 52 L 31 52 C 28 52 26 54 26 57 L 26 71 C 26 73 25 74 24 74 Z"
          fill="#0b7a42"
        />

        {/* Dynamic Inner Accents */}
        <circle cx="82" cy="18" r="3" fill="#10b981" />
      </svg>
    </div>
  );
}
