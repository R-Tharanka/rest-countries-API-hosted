import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';
import { fetchByAlpha } from '../services/countries';
import Header from '../components/Header';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]); // State to store favorite country codes
    const [countries, setCountries] = useState([]); // State to store country details
    const user = localStorage.getItem('user'); // Retrieve logged-in user from localStorage

    useEffect(() => {
        const favCodes = JSON.parse(localStorage.getItem('favorites')) || []; // Retrieve favorite country codes from localStorage
        setFavorites(favCodes);

        const fetchFavorites = async () => {
            try {
                // Fetch details of all favorite countries using their codes
                const promises = favCodes.map(code => fetchByAlpha(code).then(res => res[0]));
                const data = await Promise.all(promises);
                setCountries(data); // Update state with fetched country details
            } catch (err) {
                console.error('Failed to fetch favorites:', err); // Log any errors during fetch
            }
        };

        fetchFavorites();
    }, []); // Run effect only once when the component mounts

    // If user is not logged in, show a message
    if (!user) return <p className="p-4 text-center">Please login to view favorites.</p>;

    return (
        <div>
            <Header /> {/* Render the header component */}

            <div className="p-4 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Your Favorite Countries</h2>
                {countries.length === 0 ? (
                    <p>No favorites added yet.</p> // Show message if no favorite countries are available
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
