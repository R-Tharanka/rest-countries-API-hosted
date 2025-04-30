import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Globe from '../components/Globe';


export default function ControlsBar({ onSearch, onFilter }) {

  const fullText = 'Explore Countries Around the Globe';
  const [text, setText] = useState('');
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setShowGlobe(true); // Show globe after typing complete
      }
    }, 50); // typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:h-[380px] md:pb-5 md:flex md:items-stretch md:flex-col md:justify-end md:bg-gray-200
    lg:h-[460px] lg:pb-5 lg:flex lg:items-stretch lg:flex-col lg:justify-end lg:bg-gray-200
    sm:h-[300px]">

      <div className="text-center lg:text-left px-4 lg:px-0 mt-12">
        <div className="flex items-center">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl lg:ml-[140px] md:ml-[90px] font-extrabold mb-4 sm:text-center"
            style={{ fontFamily: 'Roboto' }}
          >
            {text}
          </h1>

          {showGlobe && (
            <div className="hidden md:block ml-2">
              <Globe />
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

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-evenly mt-10 mb-6 mx-4">
        <input
          type="text"
          placeholder="Search for a country..."
          className="w-full md:w-1/3 p-2 border rounded-[6px] shadow"
          onChange={(e) => onSearch(e.target.value)}
        />
        <label htmlFor="region-filter" className="sr-only">Filter by Region</label>
        <select
          id="region-filter"
          className="w-full md:w-[150px] p-2 border rounded-[6px] shadow"
          onChange={(e) => onFilter(e.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
}
