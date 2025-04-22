const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
  const res = await fetch(`${BASE_URL}/all`);
  if (!res.ok) throw new Error('Failed to fetch countries');
  return await res.json();
};

export const fetchByName = async (name) => {
  const res = await fetch(`${BASE_URL}/name/${name}`);
  if (!res.ok) throw new Error('Country not found');
  return await res.json();
};

export const fetchByRegion = async (region) => {
  const res = await fetch(`${BASE_URL}/region/${region}`);
  if (!res.ok) throw new Error('Failed to fetch by region');
  return await res.json();
};

export const fetchByAlpha = async (code) => {
  const res = await fetch(`${BASE_URL}/alpha/${code}`);
  if (!res.ok) throw new Error('Failed to fetch country by code');
  return await res.json();
};
