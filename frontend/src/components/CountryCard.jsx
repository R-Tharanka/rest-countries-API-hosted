// src/components/CountryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPinIcon,
  GlobeAltIcon,
  UsersIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// CountryCard component displays a card with country details
export default function CountryCard({
  flag, // URL of the country's flag image
  name, // Name of the country
  population, // Population of the country
  region, // Region the country belongs to
  capital, // Capital city of the country
  code // Country code used for routing
}) {
  return (
    // Link wraps the entire card and navigates to the country details page
    <Link to={`/country/${code}`} className="block">
      <div
        className="
          bg-white mb-10 rounded-lg overflow-hidden shadow-md
          hover:shadow-xl transition-all duration-300 hover:scale-[1.02]
          flex flex-col h-full
        "
      >
        {/* Flag section with a “holographic” wave overlay */}
        <div className="relative group overflow-hidden">
          <img
            src={flag}
            alt={`${name} flag`} // Accessible alt text for the flag image
            className="h-40 w-full object-cover"
          />
          {/* Gradient overlay that animates on hover */}
          <div
            className="
              absolute -top-[50%] -left-[50%] w-[200%] h-[200%]
              transform -rotate-[25deg]
              bg-gradient-to-t from-transparent to-white/30
              opacity-0 group-hover:opacity-60
              group-hover:translate-y-[100%]
              transition-all duration-700 ease-out
              pointer-events-none
            "
          />
        </div>

        {/* Card body containing country details */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Country name with an icon */}
          <h3 className="flex items-center justify-between text-xl font-semibold mb-2">
            {name}
            <GlobeAltIcon className="w-5 h-5 text-green-500" />
          </h3>

          {/* Region badge */}
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mb-4">
            {region}
          </span>

          {/* List of additional details */}
          <ul className="flex-1 space-y-2 text-gray-700">
            {/* Capital city */}
            <li className="flex items-center">
              <MapPinIcon className="w-5 h-5 text-blue-500 mr-2" />
              {capital || '—'} {/* Display '—' if capital is not available */}
            </li>
            {/* Population */}
            <li className="flex items-center">
              <UsersIcon className="w-5 h-5 text-indigo-500 mr-2" />
              {population.toLocaleString()} {/* Format population with commas */}
            </li>
          </ul>

          {/* Call-to-action button */}
          <button className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            See details <ArrowRightIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </Link>
  );
}
