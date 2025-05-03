import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchByAlpha } from '../services/countries';
import Header from '../components/Header';
import { addFavorite, removeFavorite } from '../services/favorites';
import { handleAuthError } from '../utils/handleAuthError';

export default function CountryDetail() {
  const { code } = useParams(); // Get the country code from the URL parameters
  const navigate = useNavigate(); // Hook for programmatic navigation

  const [country, setCountry] = useState(null); // State to store country details
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(''); // State to store error messages
  const [sessionExpired, setSessionExpired] = useState(false); // State to track session expiration

  const user = localStorage.getItem('user'); // Get the logged-in user from localStorage
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the country is a favorite

  useEffect(() => {
    const getCountry = async () => {
      try {
        // Fetch country details by code
        const data = await fetchByAlpha(code);
        setCountry(data[0]);

        // Check if the country is in the user's favorites
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.includes(code));
      } catch (err) {
        setError('Failed to fetch country details'); // Set error message if fetch fails
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    getCountry();
  }, [code]); // Re-run effect when the country code changes

  const handleFavoriteToggle = async () => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      let updatedFavorites;

      if (isFavorite) {
        // Remove from favorites
        updatedFavorites = favorites.filter(fav => fav !== code);
        await removeFavorite(code, navigate, setSessionExpired);
      } else {
        // Add to favorites
        updatedFavorites = [...favorites, code];
        await addFavorite(code, navigate, setSessionExpired);
      }

      // Update localStorage and state
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);

      // Show success toast
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (err) {
      console.error(err.message); // Log error if toggle fails
    }
  };

  // Render loading, error, or "not found" messages
  if (loading) return <p className="p-4">Loading country...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!country) return <p className="p-4">Country not found</p>;

  return (
    <div>
      <Header /> {/* Render the header component */}
      {sessionExpired && (
        <div className="bg-yellow-100 text-yellow-800 text-center p-2 text-sm">
          Session expired. Please log in again.
        </div>
      )}
      <div className="p-4 max-w-4xl mx-auto fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-4 gap-2">
          {/* Back button */}
          <Link
            to="/"
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-blue-600 font-medium rounded shadow-sm transition duration-150"
          >
            ← Back
          </Link>

          {/* Favorite toggle button (only visible if user is logged in) */}
          {user && (
            <button
              onClick={handleFavoriteToggle}
              className={`px-4 py-2 rounded shadow text-white ${isFavorite
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-600 hover:bg-gray-700'
                }`}
            >
              {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
          )}
        </div>

        {/* Country details */}
        <h1 className="text-3xl font-bold mb-8 mt-8">{country.name.official}</h1>
        <img src={country.flags.svg} alt={`${country.name.common} flag`} className="h-40 w-auto mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Display various country details */}
          <p><strong>Common Name:</strong> {country.name.common}</p>
          <p><strong>Native Name:</strong> {
            country.name.nativeName
              ? Object.values(country.name.nativeName)[0].common
              : 'N/A'
          }</p>
          <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Timezones:</strong> {country.timezones?.join(', ') || 'N/A'}</p>
          <p><strong>Start of Week:</strong> {country.startOfWeek || 'N/A'}</p>
          <p><strong>Top Level Domain:</strong> {country.tld?.join(', ') || 'N/A'}</p>
          <p><strong>Languages:</strong> {
            country.languages
              ? Object.values(country.languages).join(', ')
              : 'N/A'
          }</p>
          <p><strong>Currencies:</strong> {
            country.currencies
              ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
              : 'N/A'
          }</p>
          <p><strong>Borders:</strong> {
            country.borders
              ? country.borders.join(', ')
              : 'None'
          }</p>
        </div>

        {/* Display coat of arms if available */}
        {country.coatOfArms?.svg && (
          <div className="mt-6">
            <p className="font-semibold mb-2">Coat of Arms:</p>
            <img src={country.coatOfArms.svg} alt={`${country.name.common} coat of arms`} className="h-32 w-auto" />
          </div>
        )}

        {/* Display map location if coordinates are available */}
        {country.latlng && (
          <div className="mt-10">
            <p className="text-lg font-semibold mb-2">Location on Map:</p>
            <div className="w-full h-96 rounded overflow-hidden shadow-lg">
              <iframe
                title={`${country.name.common} location`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&z=5&output=embed`}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
