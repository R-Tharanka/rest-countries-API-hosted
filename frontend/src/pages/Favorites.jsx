import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';
import { fetchByAlpha } from '../services/countries';
import Header from '../components/Header';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [countries, setCountries] = useState([]);
    const user = localStorage.getItem('user');

    useEffect(() => {
        const favCodes = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(favCodes);

        const fetchFavorites = async () => {
            try {
                const promises = favCodes.map(code => fetchByAlpha(code).then(res => res[0]));
                const data = await Promise.all(promises);
                setCountries(data);
            } catch (err) {
                console.error('Failed to fetch favorites:', err);
            }
        };

        fetchFavorites();
    }, []);

    if (!user) return <p className="p-4 text-center">Please login to view favorites.</p>;

    return (
        <div>
            <Header />

            <div className="p-4 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Your Favorite Countries</h2>
                {countries.length === 0 ? (
                    <p>No favorites added yet.</p>
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
        </div>
    );
}
