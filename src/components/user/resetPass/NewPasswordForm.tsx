"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

const NewPasswordForm: React.FC = () => {
    const router = useRouter();
    const navigation = useRouter()
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/api/update-password', { token, newPassword });

            if (response.status === 200) {
                setSuccess(true);
                setError('');
            } else {
                setSuccess(false);
                setError('Failed to update password');
            }
        } catch (err) {
            setSuccess(false);
            setError('An error occurred while updating the password');
        }
    };

    return (
        <div className="min-h-screen  flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Reset Password Your Password</h1>
                {success && <p className="text-green-500 mb-4">Password updated successfully!</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block font-bold mb-2">
                            New Password:
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block font-bold mb-2">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPasswordForm;