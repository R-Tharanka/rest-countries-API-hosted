import React, { useState, useEffect } from 'react';
import Globe from '../components/Globe';
import heroImg from '../assets/hero-img2.jpg';

export default function ControlsBar({ onSearch, onFilter }) {
  const [region, setRegion] = useState(''); // State for selected region filter
  const [language, setLanguage] = useState(''); // State for selected language filter
  const fullText = 'Explore Countries Around the Globe'; // Full text for the typing effect
  const [text, setText] = useState(''); // State for dynamically typed text
  const [showGlobe, setShowGlobe] = useState(false); // State to control Globe component visibility

  // Handle region filter change and trigger onFilter callback
  const handleRegionChange = (value) => {
    setRegion(value);
    onFilter(value, language); // Pass updated region and current language to parent
  };

  // Handle language filter change and trigger onFilter callback
  const handleLanguageChange = (value) => {
    setLanguage(value);
    onFilter(region, value); // Pass current region and updated language to parent
  };

  useEffect(() => {
    let index = 0;
    // Typing effect for the header text
    const interval = setInterval(() => {
      setText(fullText.slice(0, index)); // Update text state with sliced portion of fullText
      index++;
      if (index > fullText.length) {
        clearInterval(interval); // Stop interval when typing is complete
        setShowGlobe(true); // Show the Globe component after typing is complete
      }
    }, 50);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div
      className="relative md:h-[380px] md:pb-5 md:flex md:items-stretch md:flex-col md:justify-end md:deep-teal
    lg:h-[460px] lg:pb-5 lg:flex lg:items-stretch lg:flex-col lg:justify-end lg:deep-teal
    sm:h-[300px]"
      style={{ backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* <div className="absolute inset-0" style={{ backgroundColor: '#112D4E', opacity: 0.1 }}></div> */}
      <div className="relative">
        {/* Header section with dynamic text and optional Globe animation */}
        <div className="text-center lg:text-left px-4 lg:px-0 mt-12">
          <div className="flex items-center justify-around ">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl lg:ml-[140px] md:ml-[90px] font-extrabold mb-4 sm:text-center"
              style={{ fontFamily: 'Roboto', color: '#fff' }}
            >
              {text} {/* Dynamically typed text */}
            </h1>

            {showGlobe && (
              <div className="hidden md:block ml-2">
                <Globe /> {/* Globe animation */}
              </div>
            )}
          </div>
          <p
            className="text-gray-600 text-base sm:text-lg lg:ml-[140px] md:ml-[90px] lg:text-xl max-w-2xl lg:mx-0 text-left sm:text-center md:relative md:top-[-10px]"
            style={{ fontFamily: 'Roboto', color: '#eee' }}
          >
            Browse countries, explore their cultures, and find your favorites.
          </p>
        </div>

        {/* Search and filter controls */}
        <div className="mt-12 mb-8 px-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-center max-w-6xl mx-auto">
            {/* Search input with frosted‑glass */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder=" Search for a country..."
                className="
          w-full
          py-2 pl-10 pr-4
          bg-white/20
          backdrop-blur-sm
          border border-white/30
          text-white placeholder-white/70
          rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-400
          transition-shadow shadow-md
        "
                onChange={(e) => onSearch(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-white/70">🔍</span>
            </div>

            {/* Region filter */}
            <select
              id="region-filter"
              className="
        w-full md:w-[180px]
        py-2 px-3
        bg-white/80
        text-gray-900
        rounded-md
        shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-400
        transition
      "
              onChange={(e) => handleRegionChange(e.target.value)}
            >
              <option value="">🌍 Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>

            {/* Language filter */}
            <select
              id="language-filter"
              className="
        w-full md:w-[200px]
        py-2 px-3
        bg-white/80
        text-gray-900
        rounded-md
        shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-400
        transition
      "
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option value="">🗣️ Language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Arabic">Arabic</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}
