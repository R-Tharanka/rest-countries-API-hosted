import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { getFavorites } from '../services/favorites';

// Login component for user authentication
export default function Login() {
    // State variables for email, password, and error messages
    const [email, setEmail] = useState(''); // Stores the user's email input
    const [password, setPassword] = useState(''); // Stores the user's password input
    const [error, setError] = useState(''); // Stores error messages for failed login attempts
    const navigate = useNavigate(); // Hook for programmatic navigation

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError(''); // Clear any previous error messages

        try {
            // Authenticate user and retrieve token and name
            const { token, name } = await loginUser(email, password);

            // Save token and user name to localStorage for session management
            localStorage.setItem('token', token);
            localStorage.setItem('user', name);

            // Sync backend favorites with localStorage
            const backendFavorites = await getFavorites();
            localStorage.setItem('favorites', JSON.stringify(backendFavorites));

            // Redirect to home page after successful login
            navigate('/');
        } catch (err) {
            // Set error message if login fails
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
            {/* Login form container */}
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    Sign in to your account
                </h2>
                {/* Display error message if login fails */}
                {error && (
                    <p className="text-center text-sm text-red-600 bg-red-100 py-2 rounded mb-4">
                        {error}
                    </p>
                )}
                {/* Login form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email input field */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {/* Password input field */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                {/* Link to registration page */}
                <p className="text-sm text-center mt-6 text-gray-600">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
