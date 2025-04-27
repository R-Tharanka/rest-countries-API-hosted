import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

export default function ControlsBar({ onSearch, onFilter }) {
  return (
    <div className="md:h-[180px] md:pb-5 md:flex md:items-stretch md:flex-col md:justify-end md:bg-gray-200
    lg:h-[180px] lg:pb-5 lg:flex lg:items-stretch lg:flex-col lg:justify-end lg:bg-gray-200">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-evenly my-6">
        <input
          type="text"
          placeholder="Search for a country..."
          className="w-full md:w-1/3 p-2 border rounded shadow"
          onChange={(e) => onSearch(e.target.value)}
        />
        <label htmlFor="region-filter" className="sr-only">Filter by Region</label>
        <select
          id="region-filter"
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
