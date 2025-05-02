import { fetchWithAuth } from './fetchWithAuth';

// Fetch the list of favorite items
export const getFavorites = async () => {
  const data = await fetchWithAuth('/favorites');
  return data.favorites; // Return the favorites array from the response
};

// Add a new item to the favorites list
export const addFavorite = async (code, navigate, setSessionExpired) => {
  const data = await fetchWithAuth(
    '/favorites',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Specify JSON content type
      body: JSON.stringify({ code }), // Send the item code in the request body
    },
    navigate,
    setSessionExpired
  );
  return data?.favorites || []; // Return the updated favorites list or an empty array
};

// Remove an item from the favorites list
export const removeFavorite = async (code, navigate, setSessionExpired) => {
  const data = await fetchWithAuth(
    `/favorites/${code}`,
    {
      method: 'DELETE', // Use DELETE method to remove the item
    },
    navigate,
    setSessionExpired
  );
  return data?.favorites || []; // Return the updated favorites list or an empty array
};
