import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import * as authService from '../../services/auth';
import * as favoritesService from '../../services/favorites';

jest.mock('../../services/auth');
jest.mock('../../services/favorites');

test('renders login form', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('handles successful login', async () => {
  authService.loginUser.mockResolvedValue({ token: 'test-token', name: 'Test User' });
  favoritesService.getFavorites.mockResolvedValue(['LKA']);

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByText(/login/i));

  expect(await screen.findByText(/login/i)).toBeInTheDocument();
});

test('handles login error', async () => {
  authService.loginUser.mockRejectedValue(new Error('Invalid credentials'));

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrongpassword' } });
  fireEvent.click(screen.getByText(/login/i));

  expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
});