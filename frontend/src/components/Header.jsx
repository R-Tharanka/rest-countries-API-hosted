import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [user, setUser] = useState(localStorage.getItem('user')); // State to track the logged-in user

  useEffect(() => {
    // Update user state when localStorage changes
    const handleStorage = () => {
      setUser(localStorage.getItem('user'));
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef(); // Ref to detect clicks outside the dropdown

  const handleLogout = () => {
    // Clear user session and navigate to home
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    // Close dropdown when clicking outside of it
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between py-4 px-4 bg-white shadow">
      {/* Application title */}
      <Link to="/" className="text-2xl font-bold">REST Countries Explorer</Link>

      {/* Conditional rendering based on user authentication */}
      {!user ? (
        // Show login button if user is not logged in
        <Link to="/login" className="px-4 py-2 rounded shadow hover:bg-gray-100">
          Login
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          {/* Link to favorites page */}
          <Link to="/favorites" className="px-4 py-2 rounded shadow hover:bg-gray-100">
            Favorites
          </Link>

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
              className="px-4 py-2 rounded shadow hover:bg-gray-100"
            >
              👤
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
                {/* Greeting message */}
                <p className="px-4 py-2 border-b">👋 Hello, {user}</p>
                {/* Logout button */}
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
