// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobeAltIcon, UserCircleIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function Header() {
  // State to track the logged-in user
  const [user, setUser] = useState(localStorage.getItem('user'));

  // State to manage dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // State to manage mobile drawer visibility
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Ref to detect clicks outside the dropdown
  const dropdownRef = useRef();

  // React Router's navigation hook
  const navigate = useNavigate();

  // Sync user state with localStorage changes
  useEffect(() => {
    const onStorage = () => setUser(localStorage.getItem('user'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const onClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Hamburger icon component for mobile menu
  function HamburgerIcon({ isOpen }) {
    return (
      <>
        {/* Top bar */}
        <span
          className={`
            block absolute h-0.5 w-full bg-gray-700
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'rotate-45 top-2.5' : 'top-1'}
          `}
        />
        {/* Middle bar */}
        <span
          className={`
            block absolute h-0.5 w-full bg-gray-700
            transition-opacity duration-200
            ${isOpen ? 'opacity-0' : 'opacity-100 top-2.5'}
          `}
        />
        {/* Bottom bar */}
        <span
          className={`
            block absolute h-0.5 w-full bg-gray-700
            transition-transform duration-300 ease-in-out
            ${isOpen ? '-rotate-45 top-2.5' : 'top-4'}
          `}
        />
      </>
    );
  }

  return (
    <>
      {/* Header section */}
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">

          {/* Logo with subtle scale effect */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:scale-[1.02] transition-transform duration-150"
          >
            <GlobeAltIcon className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-extrabold text-[#12445b]">
              REST Countries
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {!user ? (
              // Login link for unauthenticated users
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition"
              >
                Login
              </Link>
            ) : (
              <>
                {/* Favorites link */}
                <Link
                  to="/favorites"
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 transition active:scale-95 active:shadow-inner"
                >
                  <HeartIcon className="h-5 w-5 mr-1" />
                  Favorites
                </Link>

                {/* User dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(o => !o)}
                    className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg animate-slide-down origin-top-right">
                      {/* Greeting message */}
                      <p className="px-4 py-2 text-gray-800 border-b border-gray-100">
                        Hello, <span className="font-medium">{user}</span>
                      </p>
                      {/* Logout button */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 hover:rounded-md transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>

          {/* Mobile hamburger menu button */}
          <button
            className="relative md:hidden w-6 h-6 focus:outline-none"
            onClick={() => setDrawerOpen(o => !o)}
          >
            <div className="relative w-full h-full">
              {/* Hamburger icon */}
              <HamburgerIcon isOpen={drawerOpen} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile drawer menu */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out mt-[56px]
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="px-4 py-6 space-y-4">
          {!user ? (
            // Login link for unauthenticated users in mobile menu
            <Link
              to="/login"
              onClick={() => setDrawerOpen(false)}
              className="block px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition"
            >
              Login
            </Link>
          ) : (
            <>
              {/* Favorites link in mobile menu */}
              <Link
                to="/favorites"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 transition"
              >
                <HeartIcon className="h-5 w-5 mr-2" />
                Favorites
              </Link>
              {/* Divider */}
              <div className="border-t border-gray-100" />
              {/* Greeting message */}
              <p className="px-4 py-2 text-gray-800">
                Hello, <span className="font-medium">{user}</span>
              </p>
              {/* Logout button */}
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
