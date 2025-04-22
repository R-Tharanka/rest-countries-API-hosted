import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchByAlpha } from '../services/countries';

export default function CountryDetail() {
    const { code } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCountry = async () => {
            try {
                const data = await fetchByAlpha(code);
                setCountry(data[0]);
            } catch (err) {
                setError('Failed to fetch country details');
            } finally {
                setLoading(false);
            }
        };

        getCountry();
    }, [code]);

    if (loading) return <p className="p-4">Loading country...</p>;
    if (error) return <p className="text-red-500 p-4">{error}</p>;
    if (!country) return <p className="p-4">Country not found</p>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Link to="/" className="text-blue-600 underline mb-4 inline-block">← Back</Link>

            <img src={country.flags.svg} alt={`${country.name.common} flag`} className="h-40 w-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">{country.name.official}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            {country.coatOfArms?.svg && (
                <div className="mt-6">
                    <p className="font-semibold mb-2">Coat of Arms:</p>
                    <img src={country.coatOfArms.svg} alt={`${country.name.common} coat of arms`} className="h-32 w-auto" />
                </div>
            )}

            
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
    );

}
