import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

test('renders login link when user is not logged in', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('renders favorites link and logout button when user is logged in', () => {
  localStorage.setItem('user', 'Test User');

  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  expect(screen.getByText(/favorites/i)).toBeInTheDocument();
  expect(screen.getByText(/👤/i)).toBeInTheDocument();

  localStorage.removeItem('user');
});

test('logout button clears user data and redirects to home', () => {
  localStorage.setItem('user', 'Test User');
  localStorage.setItem('token', 'test-token');

  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText(/👤/i));
  fireEvent.click(screen.getByText(/logout/i));

  expect(localStorage.getItem('user')).toBeNull();
  expect(localStorage.getItem('token')).toBeNull();
});

test('closes dropdown menu when clicking outside', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  const dropdownButton = screen.getByText(/👤/i);
  fireEvent.click(dropdownButton); // Open dropdown

  expect(screen.getByText(/logout/i)).toBeInTheDocument();

  fireEvent.mouseDown(document.body); // Simulate clicking outside

  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
});