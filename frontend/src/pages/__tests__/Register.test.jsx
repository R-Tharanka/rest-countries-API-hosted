// src/pages/__tests__/Register.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, __setNavigateMock } from 'react-router-dom';
import Register from '../Register';

describe('Register page', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    // wire our stubbed useNavigate() to mockNavigate
    __setNavigateMock(mockNavigate);
  });

  it('renders all form controls and the register button/link', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // heading
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
    // inputs
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    // register button
    expect(screen.getByRole('button', { name: /^register$/i })).toBeInTheDocument();
    // link to login
    expect(screen.getByRole('link', { name: /login here/i })).toHaveAttribute('href', '/login');
  });

  it('navigates to /login on successful registration', async () => {
    // mock fetch to succeed
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({})
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // fill & submit
    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password' }
    });
    fireEvent.click(screen.getByRole('button', { name: /^register$/i }));

    // should call navigate('/login')
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('shows an error message on failed registration and does not navigate', async () => {
    // mock fetch to return an error payload
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Email already in use' })
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password' }
    });
    fireEvent.click(screen.getByRole('button', { name: /^register$/i }));

    // error should appear
    expect(await screen.findByText(/email already in use/i)).toBeInTheDocument();
    // navigation should not have happened
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
