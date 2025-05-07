import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component for the registration page
export default function Register() {
    // State variables to manage form inputs and error messages
    const [name, setName] = useState(''); // State for the user's name
    const [email, setEmail] = useState(''); // State for the user's email
    const [password, setPassword] = useState(''); // State for the user's password
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate(); // Hook to programmatically navigate between routes

    // Function to handle form submission
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError(''); // Clear any previous error messages

        try {
            // Send registration data to the backend API
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
                method: 'POST', // HTTP method for creating a new resource
                headers: { 'Content-Type': 'application/json' }, // Specify JSON content type
                body: JSON.stringify({ name, email, password }), // Convert form data to JSON
            });

            if (!res.ok) {
                // If the response is not OK, extract and throw the error message
                const err = await res.json();
                throw new Error(err.message);
            }

            // On successful registration, navigate to the login page
            navigate('/login');
        } catch (err) {
            // Set the error message to display to the user
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100 px-4">
            {/* Container for the registration form */}
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create an Account</h2>
                {/* Display error message if any */}
                {error && (
                    <p className="text-center text-sm text-red-600 bg-red-100 py-2 rounded mb-4">
                        {error}
                    </p>
                )}
                {/* Registration form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Input field for name */}
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {/* Input field for email */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {/* Input field for password */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                {/* Link to navigate to the login page */}
                <p className="text-sm text-center mt-6 text-gray-600">
                    Already registered?{' '}
                    <a href="/login" className="text-green-600 hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
}
