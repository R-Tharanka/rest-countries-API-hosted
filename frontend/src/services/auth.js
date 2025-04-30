// Base URL for the authentication API
const API_BASE = 'http://localhost:5000/api/auth';

// Function to log in a user
export const loginUser = async (email, password) => {
  // Send a POST request to the login endpoint with email and password
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // Specify JSON content type
    body: JSON.stringify({ email, password }), // Convert email and password to JSON
  });

  // Check if the response is not OK (status code not in the range 200-299)
  if (!res.ok) {
    const err = await res.json(); // Parse error message from response
    throw new Error(err.message || 'Login failed'); // Throw an error with the message
  }

  // Parse and return the JSON response (e.g., { token, name })
  return await res.json();
};
