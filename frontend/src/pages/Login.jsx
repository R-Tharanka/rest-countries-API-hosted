import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { getFavorites } from '../services/favorites';

export default function Login() {
    // State variables for email, password, and error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Authenticate user and retrieve token and name
            const { token, name } = await loginUser(email, password);

            // Save token and user name to localStorage
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
        <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {/* Display error message if login fails */}
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                {/* Email input field */}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {/* Password input field */}
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {/* Login button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>

                {/* Link to registration page */}
                <p className="text-sm text-center mt-4">
                    Don’t have an account? <Link to="/register" className="text-blue-600 underline">Register here</Link>
                </p>
            </form>
        </div>
    );
}
