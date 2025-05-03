import React from 'react';
import { Link } from 'react-router-dom';

// CountryCard component displays information about a country and links to its detailed page
export default function CountryCard({ flag, name, population, region, capital, code }) {
  return (
    // Link to the detailed page of the country using its code
    <Link to={`/country/${code}`}>
      <div className="bg-white mb-[40px] rounded-lg overflow-hidden shadow card-animation fade-in hover:shadow-lg transition hover:scale-[1.02]">
        {/* Display the country's flag */}
        <img src={flag} alt={`${name} flag`} className="h-32 w-full object-cover" />
        <div className="p-4">
          {/* Display the country's name */}
          <h2 className="font-semibold mb-2">{name}</h2>
          {/* Display the country's capital */}
          <p><strong>Capital:</strong> {capital}</p>
          {/* Display the country's region */}
          <p><strong>Region:</strong> {region}</p>
          {/* Display the country's population */}
          <p><strong>Population:</strong> {population}</p>
        </div>
      </div>
    </Link>
  );
}
