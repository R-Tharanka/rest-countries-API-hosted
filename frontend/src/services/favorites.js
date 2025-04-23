import { fetchWithAuth } from './fetchWithAuth';

export const getFavorites = async () => {
  const data = await fetchWithAuth('/favorites');
  return data.favorites;
};

export const addFavorite = async (code, navigate, setSessionExpired) => {
    const data = await fetchWithAuth('/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    }, navigate, setSessionExpired);
    return data?.favorites || [];
  };
  
  export const removeFavorite = async (code, navigate, setSessionExpired) => {
    const data = await fetchWithAuth(`/favorites/${code}`, {
      method: 'DELETE',
    }, navigate, setSessionExpired);
    return data?.favorites || [];
  };
