import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between py-4 px-4 bg-white shadow">
      <Link to="/" className="text-2xl font-bold">REST Countries Explorer</Link>

      {!user ? (
        <Link to="/login" className="px-4 py-2 rounded shadow hover:bg-gray-100">
          Login
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          <Link to="/favorites" className="px-4 py-2 rounded shadow hover:bg-gray-100">
            Favorites
          </Link>
          {/* Profile dropdown below */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 rounded shadow hover:bg-gray-100"
            >
              👤
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
                <p className="px-4 py-2 border-b">👋 Hello, {user}</p>
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
