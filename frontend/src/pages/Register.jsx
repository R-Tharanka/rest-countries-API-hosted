import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    // State variables to manage form inputs and error messages
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError(''); // Clear any previous error messages

        try {
            // Send registration data to the backend API
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
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
        <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {/* Display error message if any */}
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
                {/* Input field for name */}
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {/* Input field for email */}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {/* Input field for password */}
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Register
                </button>

                {/* Link to navigate to the login page */}
                <p className="text-sm text-center mt-4">
                    Already registered? <a href="/login" className="text-blue-600 underline">Login here</a>
                </p>
            </form>
        </div>
    );
}
