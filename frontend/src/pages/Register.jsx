import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }

            // On success, redirect to login
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Register
                </button>

                <p className="text-sm text-center mt-4">
                    Already registered? <a href="/login" className="text-blue-600 underline">Login here</a>
                </p>

            </form>
        </div>
    );
}
