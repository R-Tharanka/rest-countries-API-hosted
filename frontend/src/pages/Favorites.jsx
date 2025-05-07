import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';
import { fetchByAlpha } from '../services/countries';
import Header from '../components/Header';

export default function Favorites() {
  // State to store favorite country codes
  const [favorites, setFavorites] = useState([]);      

  // State to store detailed information about favorite countries
  const [countries, setCountries] = useState([]);      

  // State to store error messages, if any
  const [error, setError] = useState('');              

  // Retrieve the logged-in user from localStorage
  const user = localStorage.getItem('user');

  useEffect(() => {
    // Retrieve favorite country codes from localStorage
    const favCodes = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favCodes);

    // Fetch detailed information for each favorite country
    const fetchFavorites = async () => {
      try {
        // Create an array of promises to fetch country details by code
        const promises = favCodes.map((code) =>
          fetchByAlpha(code).then((res) => res[0])
        );

        // Wait for all promises to resolve
        const data = await Promise.all(promises);

        // Update the state with the fetched country details
        setCountries(data);
      } catch (err) {
        // Log the error and update the error state
        console.error('Failed to fetch favorites:', err);
        setError('Failed to fetch favorites');       
      }
    };

    fetchFavorites();
  }, []);

  // If the user is not logged in, show a message prompting them to log in
  if (!user) {
    return <p className="p-4 text-center">Please login to view favorites.</p>;
  }

  return (
    <div>
      {/* Render the header component */}
      <Header />

      <div className="p-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Favorite Countries</h2>

        {/* Show an error message if there was an error fetching data */}
        {error ? (
          <p className="text-red-500">{error}</p>

        // Show a message if there are no favorite countries
        ) : countries.length === 0 ? (
          <p>No favorites added yet.</p>

        // Render a grid of favorite countries
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {countries.map((country) => (
              <CountryCard
                key={country.cca3} // Unique key for each country
                code={country.cca3} // Country code
                flag={country.flags.svg} // Country flag URL
                name={country.name.common} // Country name
                population={country.population.toLocaleString()} // Formatted population
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
