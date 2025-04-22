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
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    if (!query) {
      getCountries(); // fallback to all
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await fetchByName(query);
      setCountries(data);
    } catch (err) {
      setError('No countries found.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (region) => {
    if (!region) {
      getCountries(); // fallback to all
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await fetchByRegion(region);
      setCountries(data);
    } catch (err) {
      setError('Error filtering by region.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const getCountries = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllCountries();
      setCountries(data);
    } catch (err) {
      setError('Failed to fetch countries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="mx-auto max-w-7xl p-4">
      <Header />
      <ControlsBar onSearch={handleSearch} onFilter={handleFilter} />
      {loading ? (
        <p>Loading countries...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {countries.map((country) => (
            <CountryCard
              key={country.cca3}
              code={country.cca3}
              flag={country.flags.svg}
              name={country.name.common}
              population={country.population.toLocaleString()}
              region={country.region}
              capital={country.capital?.[0] || 'N/A'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
