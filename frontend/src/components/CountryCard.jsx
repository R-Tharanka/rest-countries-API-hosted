// src/components/CountryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPinIcon,
  GlobeAltIcon,
  UsersIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function CountryCard({
  flag,
  name,
  population,
  region,
  capital,
  code
}) {
  return (
    <Link to={`/country/${code}`} className="block">
      <div
        className="
          bg-white mb-10 rounded-lg overflow-hidden shadow-md
          hover:shadow-xl transition-all duration-300 hover:scale-[1.02]
          flex flex-col h-full
        "
      >
        {/* Flag with “holographic” wave overlay */}
        <div className="relative group overflow-hidden">
          <img
            src={flag}
            alt={`${name} flag`}
            className="h-40 w-full object-cover"
          />
          {/* gradient overlay that “waves” down on hover */}
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

        {/* Card body */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title + icon */}
          <h3 className="flex items-center justify-between text-xl font-semibold mb-2">
            {name}
            <GlobeAltIcon className="w-5 h-5 text-green-500" />
          </h3>

          {/* Region badge */}
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mb-4">
            {region}
          </span>

          {/* Details */}
          <ul className="flex-1 space-y-2 text-gray-700">
            <li className="flex items-center">
              <MapPinIcon className="w-5 h-5 text-blue-500 mr-2" />
              {capital || '—'}
            </li>
            <li className="flex items-center">
              <UsersIcon className="w-5 h-5 text-indigo-500 mr-2" />
              {population.toLocaleString()}
            </li>
          </ul>

          {/* CTA */}
          <button className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            See details <ArrowRightIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </Link>
  );
}
