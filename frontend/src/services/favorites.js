const API_BASE = 'http://localhost:5000/api/auth';

const getToken = () => `Bearer ${localStorage.getItem('token')}`;

export const getFavorites = async () => {
    const res = await fetch(`${API_BASE}/favorites`, {
        headers: {
            Authorization: getToken(),
        },
    });

    if (!res.ok) throw new Error('Failed to fetch favorites');
    const data = await res.json();
    return data.favorites; // returns an array
};

export const addFavorite = async (code) => {
    console.log('Sending POST body:', { code });
    const res = await fetch(`${API_BASE}/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken(),
        },
        body: JSON.stringify({ code }),
    });

    if (!res.ok) throw new Error('Failed to add favorite');
    const data = await res.json();
    return data.favorites;
};

export const removeFavorite = async (code) => {
    const res = await fetch(`${API_BASE}/favorites/${code}`, {
        method: 'DELETE',
        headers: {
            Authorization: getToken(),
        },
    });

    if (!res.ok) throw new Error('Failed to remove favorite');
    const data = await res.json();
    return data.favorites;
};
