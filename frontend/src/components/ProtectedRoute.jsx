// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function isTokenExpired(token) {
  try {
    // JWT is three segments: header.payload.signature
    const payload = JSON.parse(atob(token.split('.')[1]));
    // payload.exp is in seconds since epoch
    return payload.exp * 1000 < Date.now();
  } catch {
    // if anything goes wrong, treat it as expired
    return true;
  }
}

export default function ProtectedRoute({ children }) {
  const raw = localStorage.getItem('token');

  if (!raw || isTokenExpired(raw)) {
    // clean up stale session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
    return <Navigate to="/login" replace />;
  }

  return children;
}
