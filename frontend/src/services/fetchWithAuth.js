import { handleAuthError } from '../utils/handleAuthError';

// Function to make authenticated API requests
export async function fetchWithAuth(endpoint, options = {}, navigate, setSessionExpired) {
  // Retrieve the authentication token from local storage
  const token = localStorage.getItem('token');

  // Make the API request with the provided endpoint and options
  const res = await fetch(`http://localhost:5000/api/auth${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}), // Merge any existing headers with the Authorization header
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });

  // Handle unauthorized (401) responses
  if (res.status === 401) {
    handleAuthError(navigate, setSessionExpired); // Gracefully handle authentication errors
    return; // Stop further processing
  }

  // Throw an error for other non-OK responses
  if (!res.ok) {
    throw new Error(`Request failed: ${res.statusText}`);
  }

  // Parse and return the JSON response
  return res.json();
}
