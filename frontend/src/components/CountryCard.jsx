import React from 'react';

export default function CountryCard({ flag, name, population, region, capital }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <img src={flag} alt={`${name} flag`} className="h-32 w-full object-cover" />
      <div className="p-4">
        <h2 className="font-semibold mb-2">{name}</h2>
        <p><strong>Population:</strong> {population}</p>
        <p><strong>Region:</strong> {region}</p>
        <p><strong>Capital:</strong> {capital}</p>
      </div>
    </div>
  );
}
