// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to check if a JWT token is expired
function isTokenExpired(token) {
  try {
    // Decode the payload from the JWT token
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Check if the token's expiration time (in seconds) has passed
    return payload.exp * 1000 < Date.now();
  } catch {
    // If decoding fails, assume the token is expired
    return true;
  }
}

// ProtectedRoute component to guard routes that require authentication
export default function ProtectedRoute({ children }) {
  // Retrieve the token from localStorage
  const raw = localStorage.getItem('token');

  // If no token exists or the token is expired, redirect to the login page
  if (!raw || isTokenExpired(raw)) {
    // Remove stale session data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
    return <Navigate to="/login" replace />;
  }

  // If the token is valid, render the child components
  return children;
}
