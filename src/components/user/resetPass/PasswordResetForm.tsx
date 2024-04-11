"use client"
import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/reset-password', { email });

            if (response.status === 200) {
                setSuccess(true);
                setError('');
            } else {
                setSuccess(false);
                setError('Failed to send password reset email');
            }
        } catch (err) {
            setSuccess(false);
            setError('An error occurred while sending the password reset email');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Reset Password</h1>
                {success && <p className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">Password reset email sent successfully!</p>}
                {error && <p className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-bold mb-2 text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetForm;