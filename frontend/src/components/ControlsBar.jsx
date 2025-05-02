import React, { useState, useEffect } from 'react';
import Globe from '../components/Globe';

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
    <div className="md:h-[380px] md:pb-5 md:flex md:items-stretch md:flex-col md:justify-end md:bg-gray-200
    lg:h-[460px] lg:pb-5 lg:flex lg:items-stretch lg:flex-col lg:justify-end lg:bg-gray-200
    sm:h-[300px]">
      {/* Header section with dynamic text and optional Globe animation */}
      <div className="text-center lg:text-left px-4 lg:px-0 mt-12">
        <div className="flex items-center">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl lg:ml-[140px] md:ml-[90px] font-extrabold mb-4 sm:text-center"
            style={{ fontFamily: 'Roboto' }}
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
          className="text-gray-600 text-base sm:text-lg lg:ml-[140px] md:ml-[90px] lg:text-xl max-w-2xl lg:mx-0 text-left sm:text-center"
          style={{ fontFamily: 'Roboto' }}
        >
          Browse countries, explore their cultures, and find your favorites.
        </p>
      </div>

      {/* Search and filter controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-evenly mt-10 mb-6 mx-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search for a country..."
          className="w-full md:w-1/3 p-2 border rounded-[6px] shadow"
          onChange={(e) => onSearch(e.target.value)} // Trigger onSearch callback with input value
        />
        {/* Region filter dropdown */}
        <select
          id="region-filter"
          className="w-full md:w-[150px] p-2 border rounded-[6px] shadow"
          onChange={(e) => handleRegionChange(e.target.value)} // Trigger region filter change
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        {/* Language filter dropdown */}
        <select
          id="language-filter"
          className="w-full md:w-[170px] p-2 border rounded-[6px] shadow"
          onChange={(e) => handleLanguageChange(e.target.value)} // Trigger language filter change
        >
          <option value="">Filter by Language</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Arabic">Arabic</option>
          <option value="Chinese">Chinese</option>
        </select>
      </div>
    </div>
  );
}
