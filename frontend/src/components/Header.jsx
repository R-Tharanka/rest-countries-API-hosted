
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobeAltIcon, UserCircleIcon, HeartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => setUser(localStorage.getItem('user'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const onClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo / Title */}
        <Link to="/" className="flex items-center space-x-2">
          <GlobeAltIcon className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-extrabold text-[#12445b]">REST Countries</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-4">
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/favorites"
                className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 transition"
              >
                <HeartIcon className="h-5 w-5 mr-1" />
                Favorites
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(open => !open)}
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition"
                >
                  <UserCircleIcon className="h-6 w-6" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg animate-slide-down">
                    <p className="px-4 py-2 text-gray-800 border-b border-gray-100">Hello, <span className="font-medium">{user}</span></p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition"
          onClick={() => setMobileOpen(open => !open)}
        >
          {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            {!user ? (
              <Link to="/login" className="block px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition">
                Login
              </Link>
            ) : (
              <>
                <Link to="/favorites" className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 transition">
                  <HeartIcon className="h-5 w-5 mr-2" />
                  Favorites
                </Link>
                <div className="border-t border-gray-100"></div>
                <p className="px-4 py-2 text-gray-800">Hello, <span className="font-medium">{user}</span></p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
