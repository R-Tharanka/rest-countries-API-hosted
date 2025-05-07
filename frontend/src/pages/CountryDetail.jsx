// src/pages/CountryDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchByAlpha } from '../services/countries';
import Header from '../components/Header';
import { addFavorite, removeFavorite } from '../services/favorites';
import { handleAuthError } from '../utils/handleAuthError';
import {
  ChevronLeftIcon,
  MapPinIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

export default function CountryDetail() {
  const { code } = useParams(); // Get the country code from the URL parameters
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [country, setCountry] = useState(null); // State to store country details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(''); // State to store error messages
  const [sessionExpired, setSessionExpired] = useState(false); // State to handle session expiration
  const user = localStorage.getItem('user'); // Retrieve user information from localStorage
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the country is a favorite

  // Fetch country details when the component mounts or the country code changes
  useEffect(() => {
    const getCountry = async () => {
      try {
        const data = await fetchByAlpha(code); // Fetch country details by alpha code
        setCountry(data[0]); // Set the country data
        const favs = JSON.parse(localStorage.getItem('favorites')) || []; // Get favorites from localStorage
        setIsFavorite(favs.includes(code)); // Check if the country is in favorites
      } catch {
        setError('Failed to load country data.'); // Handle fetch error
      } finally {
        setLoading(false); // Stop loading
      }
    };
    getCountry();
  }, [code]);

  // Handle adding/removing the country from favorites
  const handleFavoriteToggle = async () => {
    try {
      const favs = JSON.parse(localStorage.getItem('favorites')) || []; // Get current favorites
      let updated;
      if (isFavorite) {
        updated = favs.filter(f => f !== code); // Remove from favorites
        await removeFavorite(code, navigate, setSessionExpired); // Call API to remove favorite
      } else {
        updated = [...favs, code]; // Add to favorites
        await addFavorite(code, navigate, setSessionExpired); // Call API to add favorite
      }
      localStorage.setItem('favorites', JSON.stringify(updated)); // Update localStorage
      setIsFavorite(!isFavorite); // Toggle favorite state
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites'); // Show success message
    } catch (err) {
      handleAuthError(err, navigate, setSessionExpired); // Handle authentication errors
    }
  };

  // Render loading state
  if (loading) return <p className="p-6 text-center text-gray-600">Loading…</p>;
  // Render error state
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  // Render not found state
  if (!country) return <p className="p-6 text-center">Country not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header /> {/* Header component */}

      {/* Display session expiration message */}
      {sessionExpired && (
        <div className="bg-yellow-100 text-yellow-800 text-center py-2 animate-fade-up">
          Session expired. Please log in again.
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-up">
          <Link
            to="/"
            className="inline-flex items-center px-3 py-2 bg-white rounded shadow hover:bg-gray-100 transition-transform transform hover:-translate-y-1"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-700 mr-1" />
            Back {/* Back button */}
          </Link>
          {user && (
            <button
              onClick={handleFavoriteToggle}
              className="inline-flex items-center px-4 py-2 bg-white rounded shadow hover:bg-gray-100 transition-transform transform hover:-translate-y-1"
            >
              {isFavorite
                ? <HeartSolid className="h-5 w-5 text-red-600 mr-2 animate-pulse" />
                : <HeartOutline className="h-5 w-5 text-gray-600 mr-2" />
              }
              {isFavorite ? 'Remove Favorite' : 'Add to Favorites'} {/* Favorite toggle button */}
            </button>
          )}
        </div>

        {/* Country Header Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-up">
          <div className="sm:flex">
            <img
              src={country.flags.svg} // Country flag
              alt={`${country.name.common} flag`}
              className="w-full sm:w-1/3 h-48 object-cover"
            />
            <div className="p-6 flex-1">
              <h1 className="text-3xl font-bold mb-2">{country.name.official}</h1> {/* Official name */}
              <p className="text-gray-600">{country.name.common}</p> {/* Common name */}
            </div>
          </div>
        </div>

        {/* Key Facts */}
        <section className="bg-white rounded-lg shadow-md p-6 animate-fade-up">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Key Facts</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Capital */}
            <div>
              <dt className="text-sm font-medium text-gray-500">Capital</dt>
              <dd className="flex items-center mt-1 text-gray-800">
                <MapPinIcon className="h-5 w-5 text-blue-500 mr-2" />
                {country.capital?.[0] || 'N/A'}
              </dd>
            </div>
            {/* Population */}
            <div>
              <dt className="text-sm font-medium text-gray-500">Population</dt>
              <dd className="flex items-center mt-1 text-gray-800">
                <UsersIcon className="h-5 w-5 text-indigo-500 mr-2" />
                {country.population.toLocaleString()}
              </dd>
            </div>
            {/* Region */}
            <div>
              <dt className="text-sm font-medium text-gray-500">Region</dt>
              <dd className="mt-1 text-gray-800">{country.region}</dd>
            </div>
            {/* Subregion */}
            <div>
              <dt className="text-sm font-medium text-gray-500">Subregion</dt>
              <dd className="mt-1 text-gray-800">{country.subregion || 'N/A'}</dd>
            </div>
            {/* Languages */}
            <div>
              <dt className="text-sm font-medium text-gray-500">Languages</dt>
              <dd className="mt-1 text-gray-800">
                {country.languages
                  ? Object.values(country.languages).join(', ')
                  : 'N/A'}
              </dd>
            </div>
            {/* Currencies */}
            <div>
              <dt className="text-sm font-medium text-gray-500">Currencies</dt>
              <dd className="mt-1 text-gray-800">
                {country.currencies
                  ? Object.values(country.currencies)
                      .map(c => `${c.name} (${c.symbol})`)
                      .join(', ')
                  : 'N/A'}
              </dd>
            </div>
          </dl>
        </section>

        {/* More Details */}
        <section className="bg-white rounded-lg shadow-md p-6 animate-fade-up">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">More Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
            {/* Timezones */}
            <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
            {/* Start of Week */}
            <p><strong>Start of Week:</strong> {country.startOfWeek}</p>
            {/* Top Level Domain */}
            <p><strong>Top Level Domain:</strong> {country.tld?.join(', ') || 'N/A'}</p>
            {/* Borders */}
            <p><strong>Borders:</strong> {country.borders?.join(', ') || 'None'}</p>
          </div>
        </section>

        {/* Coat of Arms */}
        {country.coatOfArms?.svg && (
          <section className="bg-white rounded-lg shadow-md p-6 animate-fade-up">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Coat of Arms</h2>
            <img
              src={country.coatOfArms.svg} // Coat of arms image
              alt={`${country.name.common} coat of arms`}
              className="h-32 w-auto mx-auto"
            />
          </section>
        )}

        {/* Map */}
        {country.latlng && (
          <section className="bg-white rounded-lg shadow-md p-6 animate-fade-up">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Location</h2>
            <div className="w-full h-96 rounded overflow-hidden">
              <iframe
                title={`${country.name.common} location`} // Embedded Google Map
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&z=5&output=embed`}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
