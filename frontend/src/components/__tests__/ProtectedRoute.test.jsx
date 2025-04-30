import { render } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

test('redirects to login if token is missing', () => {
  localStorage.removeItem('token');

  const { container } = render(
    <BrowserRouter>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );

  expect(container.textContent).not.toContain('Protected Content');
});

test('renders children if token is valid', () => {
  const validToken = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 60 }));
  localStorage.setItem('token', `header.${validToken}.signature`);

  const { container } = render(
    <BrowserRouter>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );

  expect(container.textContent).toContain('Protected Content');

  localStorage.removeItem('token');
});

test('redirects to login if token is expired', () => {
  const expiredToken = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 60 }));
  localStorage.setItem('token', `header.${expiredToken}.signature`);

  const { container } = render(
    <BrowserRouter>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );

  expect(container.textContent).not.toContain('Protected Content');
  localStorage.removeItem('token');
});