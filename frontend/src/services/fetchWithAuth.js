import { handleAuthError } from '../utils/handleAuthError';

export async function fetchWithAuth(endpoint, options = {}, navigate, setSessionExpired) {
  const token = localStorage.getItem('token');

  const res = await fetch(`http://localhost:5000/api/auth${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    // Don't throw — allow graceful handling in component
    handleAuthError(navigate, setSessionExpired);
    return;
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.statusText}`);
  }

  return res.json();
}
