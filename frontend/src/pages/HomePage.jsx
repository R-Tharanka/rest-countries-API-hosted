import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ControlsBar from '../components/ControlsBar';
import CountryCard from '../components/CountryCard';
import {
  fetchAllCountries,
  fetchByName,
  fetchByRegion
} from '../services/countries';

export default function HomePage() {
  // State to store the list of countries
  const [countries, setCountries] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to handle error messages
  const [error, setError] = useState('');

  // Handles search functionality based on user query
  const handleSearch = async (query) => {
    if (!query) {
      getCountries(); // Fetch all countries if query is empty
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await fetchByName(query); // Fetch countries by name
      setCountries(data);
    } catch (err) {
      setError('No countries found.'); // Handle no results
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  // Handles filtering functionality based on region and language
  const handleFilter = async (region, language) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllCountries(); // Fetch all countries
      const filtered = data.filter((country) => {
        const matchesRegion = region ? country.region === region : true; // Match region if provided
        const matchesLanguage = language
          ? country.languages && Object.values(country.languages).includes(language) // Match language if provided
          : true;
        return matchesRegion && matchesLanguage;
      });
      setCountries(filtered);
    } catch (err) {
      setError('Error filtering countries.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  // Handles filtering functionality based on language
  const handleFilterByLanguage = async (language) => {
    if (!language) {
      getCountries(); // Fetch all countries if no language is selected
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await fetchAllCountries(); // Fetch all countries
      const filtered = data.filter((country) =>
        country.languages && Object.values(country.languages).includes(language) // Match language
      );
      setCountries(filtered);
    } catch (err) {
      setError('Error filtering by language.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetches all countries
  const getCountries = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllCountries(); // Fetch all countries from API
      setCountries(data);
    } catch (err) {
      setError('Failed to fetch countries'); // Handle fetch errors
    } finally {
      setLoading(false);
    }
  };

  // Fetch all countries on component mount
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      {/* Header component */}
      <Header />
      <div className="mx-auto">
        {/* ControlsBar for search and filter */}
        <ControlsBar
          onSearch={handleSearch} // Pass search handler
          onFilter={handleFilter} // Pass combined filter handler
        />
        {loading ? (
          // Show loading spinner while fetching data
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          // Display error message if an error occurs
          <p className="text-red-500">{error}</p>
        ) : countries.length === 0 ? (
          // Display message when no countries match the search or filter
          <p className="text-gray-600 text-center py-10">No countries match your search or filter.</p>
        ) : (
          // Display list of countries
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 mt-8">
            {countries.map((country) => (
              <CountryCard
                key={country.cca3} // Unique key for each country
                code={country.cca3} // Country code
                flag={country.flags.svg} // Country flag
                name={country.name.common} // Country name
                population={country.population.toLocaleString()} // Country population
                region={country.region} // Country region
                capital={country.capital?.[0] || 'N/A'} // Country capital or 'N/A' if not available
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
