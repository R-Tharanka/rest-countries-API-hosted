import React from 'react';
import { Link } from 'react-router-dom';

export default function CountryCard({ flag, name, population, region, capital, code }) {
  return (
    <Link to={`/country/${code}`}>
      <div className="bg-white mb-[40px] rounded-lg overflow-hidden shadow hover:shadow-lg transition hover:scale-[1.02]">
        <img src={flag} alt={`${name} flag`} className="h-32 w-full object-cover" />
        <div className="p-4">
          <h2 className="font-semibold mb-2">{name}</h2>
          <p><strong>Capital:</strong> {capital}</p>
          <p><strong>Region:</strong> {region}</p>
          <p><strong>Population:</strong> {population}</p>
        </div>
      </div>
    </Link>
  );
}
