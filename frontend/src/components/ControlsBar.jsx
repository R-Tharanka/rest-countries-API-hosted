import React from 'react';

export default function ControlsBar({ onSearch, onFilter }) {
  return (
    <div className="md:h-[180px] md:pb-5 md:flex md:items-stretch md:flex-col md:justify-end
    lg:h-[180px] lg:pb-5 lg:flex lg:items-stretch lg:flex-col lg:justify-end bg-gray-200">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-evenly my-6">
        <input
          type="text"
          placeholder="Search for a country..."
          className="w-full md:w-1/3 p-2 border rounded shadow"
          onChange={(e) => onSearch(e.target.value)}
        />
        <select
          className="w-full md:w-[150px] p-2 border rounded shadow"
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
