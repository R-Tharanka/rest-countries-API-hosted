// frontend/src/components/__tests__/Header.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

beforeEach(() => {
  localStorage.clear();
});

test('renders login link when user is not logged in', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('renders favorites link and profile button when user is logged in', () => {
  localStorage.setItem('user', 'Test User');

  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  expect(screen.getByText(/favorites/i)).toBeInTheDocument();
  expect(screen.getByText(/👤/i)).toBeInTheDocument();
});

test('logout button clears user data', () => {
  localStorage.setItem('user', 'Test User');
  localStorage.setItem('token', 'test-token');

  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Open the dropdown and click logout
  fireEvent.click(screen.getByText(/👤/i));
  fireEvent.click(screen.getByText(/logout/i));

  expect(localStorage.getItem('user')).toBeNull();
  expect(localStorage.getItem('token')).toBeNull();
});

test('closes dropdown menu when clicking outside', () => {
  // Simulate a logged-in user so the 👤 button actually renders
  localStorage.setItem('user', 'Test User');

  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Open dropdown
  fireEvent.click(screen.getByText(/👤/i));
  expect(screen.getByText(/logout/i)).toBeInTheDocument();

  // Click outside
  fireEvent.mouseDown(document.body);

  // Dropdown should be gone
  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
});
