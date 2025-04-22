import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ControlsBar from '../components/ControlsBar';
import CountryCard from '../components/CountryCard';
import { fetchAllCountries } from '../services/countries';

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  return (
    <div className="mx-auto max-w-7xl p-4">
      <Header />
      <ControlsBar />
      {loading ? (
        <p>Loading countries...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {countries.map((country) => (
            <CountryCard
              key={country.cca3}
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
