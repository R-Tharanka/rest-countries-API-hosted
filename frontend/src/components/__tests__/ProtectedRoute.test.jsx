// frontend/src/components/__tests__/ProtectedRoute.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

afterEach(() => localStorage.clear());

test('redirects (renders nothing) if token is missing', () => {
  localStorage.removeItem('token');
  const { queryByText } = render(
    <MemoryRouter>
      <ProtectedRoute>
        <div> Protected</div>
      </ProtectedRoute>
    </MemoryRouter>
  );
  expect(queryByText(/Protected/)).toBeNull();
});

test('renders children if token is valid', () => {
  const validPayload = { exp: Math.floor(Date.now() / 1000) + 60 };
  const token = btoa(JSON.stringify(validPayload));
  localStorage.setItem('token', `h.${token}.s`);

  const { getByText } = render(
    <MemoryRouter>
      <ProtectedRoute>
        <div> Protected</div>
      </ProtectedRoute>
    </MemoryRouter>
  );
  expect(getByText(/Protected/)).toBeInTheDocument();
});

test('redirects if token is expired', () => {
  const expiredPayload = { exp: Math.floor(Date.now() / 1000) - 60 };
  const token = btoa(JSON.stringify(expiredPayload));
  localStorage.setItem('token', `h.${token}.s`);

  const { queryByText } = render(
    <MemoryRouter>
      <ProtectedRoute>
        <div> Protected</div>
      </ProtectedRoute>
    </MemoryRouter>
  );
  expect(queryByText(/Protected/)).toBeNull();
});
