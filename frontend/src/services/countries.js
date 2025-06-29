// Base URL for the REST Countries API
const BASE_URL = 'https://restcountries.com/v3.1';

// Fetch all countries from the API
export const fetchAllCountries = async () => {
  const res = await fetch(`${BASE_URL}/all?fields=name,flags,population,region,capital,cca3,languages`);
  if (!res.ok) throw new Error('Failed to fetch countries'); // Handle fetch errors
  return await res.json(); // Return the JSON response
};

// Fetch country details by name
export const fetchByName = async (name) => {
  const res = await fetch(`${BASE_URL}/name/${name}`);
  if (!res.ok) throw new Error('Country not found'); // Handle fetch errors
  return await res.json(); // Return the JSON response
};

// Fetch countries by region
export const fetchByRegion = async (region) => {
  const res = await fetch(`${BASE_URL}/region/${region}`);
  if (!res.ok) throw new Error('Failed to fetch by region'); // Handle fetch errors
  return await res.json(); // Return the JSON response
};

// Fetch country details by alpha code (ISO 3166-1 alpha-2 or alpha-3)
export const fetchByAlpha = async (code) => {
  const res = await fetch(`${BASE_URL}/alpha/${code}`);
  if (!res.ok) throw new Error('Failed to fetch country by code'); // Handle fetch errors
  return await res.json(); // Return the JSON response
};
